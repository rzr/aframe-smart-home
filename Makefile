#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: MPL-2.0
#{
# Copyright 2018-present Samsung Electronics France SAS, and other contributors
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.*
#}

default: all
	@echo "# log: $@: $^"

project ?= aframe-smart-home
tmp_dir ?= tmp
runtime ?= iotjs
run_args ?=
run_timeout ?= 10

main_src ?= example/index.js
NODE_PATH := .:${NODE_PATH}
export NODE_PATH

port ?= 8888
hostname ?= localhost
url ?= http://${localhost}:${port}

iotjs_modules_dir ?= ${CURDIR}/iotjs_modules
export iotjs_modules_dir

webthing-iotjs_url ?= https://github.com/rzr/webthing-iotjs
webthing-iotjs_revision ?= webthing-iotjs-0.12.1-1
webthing-iotjs_dir ?= ${iotjs_modules_dir}/webthing-iotjs
iotjs_modules_dirs += ${webthing-iotjs_dir}


help:
	@echo "## Usage: "
	@echo "# make start"
all: modules
	@echo "# log: $@: $^"

check:
	@echo "# log: $@: $^"

setup:
	@echo "# log: $@: $^"

test:
	@echo "# log: $@: $^"

node/modules: package.json
	npm install

modules: ${runtime}/modules
	@echo "# log: $@: $^"

build:
	@echo "# log: $@: $^"

run/%: ${main_src} build modules
	${@F} $< ${run_args}

run/npm: ${main_src}
	npm start

run/node: run/npm

run: run/${runtime}
	@echo "# log: $@: $^"

clean:
	@rm -rf ${tmp_dir}

cleanall: clean
	@rm -f *~

distclean: cleanall
	@rm -rf node_modules

start: run
	@echo "# log: $@: $^"

LICENSE: /usr/share/common-licenses/MPL-2.0
	cp -av $< $@

iotjs/start: ${main_src} ${iotjs_modules_dirs}
	${@D} $<

iotjs/modules: ${iotjs_modules_dirs}
	ls $^

${webthing-iotjs_dir}: Makefile
	git clone --recursive --depth=1 \
 --branch "${webthing-iotjs_revision}" \
 "${webthing-iotjs_url}" \
 "$@"
	${MAKE} -C $@ ${runtime}/modules
