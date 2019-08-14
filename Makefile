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
runtime ?= node
run_args ?=
run_timeout ?= 10

main_src ?= index.js
NODE_PATH := .:${NODE_PATH}
export NODE_PATH

port ?= 8888
hostname ?= localhost
url ?= http://${localhost}:${port}

help:
	@echo "## Usage: "
	@echo "# make start"

node_modules: package.json
	npm install

modules: ${runtime}_modules
	ls $<

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
