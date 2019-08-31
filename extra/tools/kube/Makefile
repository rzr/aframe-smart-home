#! /usr/bin/make -f
# -*- makefile -*-
# ex: set tabstop=4 noexpandtab:
# Copyright: 2019-present Samsung Electronics Co., Ltd. and other contributors
# SPDX-License-Identifier: MPL-2.0

default: help
	@echo "# log: $@: $<"


name?=aframe-smart-home
revision?=$(shell git describe --tags || echo "0.0.0")
#revision=master
port?=8888
nodePort?=31908
type=NodePort
docker?=docker
k8s?=microk8s
kubectl?=${k8s}.kubectl
topdir?=../../..
username?=tmp
image?=${username}/${name}:${revision}
namespace?=k8s.io
domain?=localhost
host?=${name}.${domain}
url?=http://${host}/


help:
	@echo "### Usage: "
	@echo "# make setup"
	@echo "# make demo"
	@echo "# make start"
	@echo "# make proxy"
	@echo "# make ingress"
	@echo "# make host"
	@echo "# make client"
	@echo "### Config: "
	@echo "# revision=${revision}"
	@echo "# log: $@: $<"

setup:
	sudo snap install ${k8s} --classic

${name}.yml: deployment.yml service.yml Makefile
	@echo '#YAML' > $@
	@echo '---'  >> $@
	cat deployment.yml >> $@
	@echo '---'  >> $@
	cat service.yml >> $@
	@echo '---'  >> $@

spec: ${name}.yml
	@echo "# log: $@: $<"

${topdir}: Makefile
	@echo "# log: $@: $<"

build: ${topdir} Makefile
	${docker} build --tag "${image}" $<

import: build
	${docker} save "${image}" \
 | ${k8s}.ctr -n ${namespace} image import -
	${k8s}.ctr --namespace ${namespace} image list \
 | grep "${image}"

save: build
	@mkdir -p ${image}.tmp
	@rmdir ${image}.tmp
	time docker save "${image}" > "${image}.tar"
	${k8s}.ctr --namespace ${namespace} image import  "${image}.tar"
	rm "${image}.tar"
	${k8s}.ctr --namespace ${namespace} image list | grep "${image}"

deployment.yml: Makefile
	${kubectl} create deployment ${name} \
 --image "${image}" \
 --dry-run -o yaml > $@

service.yml: deployment.yml Makefile
	${kubectl} apply -f $<
	${kubectl} expose deployment ${name} \
 --type=${type} --port ${port}  \
 --dry-run -o yaml > $@


apply: ${name}.yml
	${kubectl} apply -f $<
	${kubectl} describe service/${name}

enable:
	microk8s.status | grep enabled
	-${k8s}.disable ingress
	@echo "TODO check if :80 is used"
	-@sudo lsof -i :80
	${k8s}.enable ingress
	${k8s}.enable dns

ingress: ingress.yml enable
	-${kubectl} delete ingress.extensions/${name}
	${kubectl} apply -f $<
	${kubectl} get ingress.extensions/${name}
	${kubectl} describe ingress.extensions/${name} | grep "Address:"
	${kubectl} get ing

client:
	-ping -c 1 ${host}
	curl -kLi ${url}

status:
	${MAKE} status/all | grep ${name}
	-${kubectl} describe ingress.extensions/${name} | grep "Address:"
	-${k8s}.ctr --namespace ${namespace} image list | grep "${image}"

status/all:
	-${kubectl} get all
	-${kubectl} get all --all-namespaces
	-${kubectl} get ingress.extensions 

start: help spec import apply ingress
	@echo "# log: $@: $<"

run: apply status proxy client
	@echo "# make status proxy"
	@echo "# make status ingress"
	@echo "# make status host"
	@echo "# make status client"

demo: start
	${MAKE} run \
 || echo "# log: may be failed, try again: make run"
	@echo "# log: $@: $<"

patch:
	${kubectl} patch service/${name}  --type='json' \
 --patch="[{\"op\": \"replace\", \"path\": \"/spec/ports/0/nodePort\", \"value\":${nodePort}}]"

proxy:
	sPort=$$(${kubectl} get service/${name} \
 -o=jsonpath="{.spec.ports[?(@.port==${port})].nodePort}") \
 && echo "sPort=$${sPort}" \
 && sUrl="http://127.0.0.1:$${sPort}" \
 && curl -kLi $${sUrl}


host: /etc/hosts
	ping -c1 ${host} || echo "127.0.0.1 ${host}" | sudo tee -a $<
	ping -c1 ${host}

purge:
	rm -fv deployment.yml service.yml ${name}.yml
