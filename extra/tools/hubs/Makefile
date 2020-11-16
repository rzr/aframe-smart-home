#!/usr/bin/make -f
# SPDX-License-Identifier: MPL-2.0
# Copyright: 2020-present Philippe Coval <https://purl.org/rzr/>

nodejs?=nodejs
x_www_browser?=chromium-browser --allow-file-access-from-files
x_www_browser?=x-www-browser

delay?=1

netcat_port?=31337


help:
	@echo "# make run # Start demo"

run: node_modules
	make client &
	make stream

server: index.js
	${nodejs} $<

client: client.html
	${x_www_browser} $<

stream: index.js
	make print | node $< --

setup:
	sudo apt-get install -y npm nodejs

node_modules:
	npm install websocket

json: json.lst
	while true ; do cat $< ; done \
  | while read line ; do echo "$${line}" ; sleep ${delay} ; done

stream/%: index.js
	make ${@F} | node $< --

listen: stream/netcat

sim: stream/json

json.lst:
	${MAKE} listen \
  | jq --raw-input 'fromjson?' --compact-output --unbuffered \
  | tee $@

netcat:
	$@ -l ${netcat_port}

start: node_modules stream/json
