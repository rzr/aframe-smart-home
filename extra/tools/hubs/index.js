#!/usr/bin/env node
// SPDX-License-Identifier: MPL-2.0
// Copyright: 2020-present Philippe Coval <https://purl.org/rzr/>

var port = 1337;
var delay = 3000;

var fs = require('fs');
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
});
var ReadableStream = Object.getPrototypeOf(process.stdin);

var connection = null;


server.listen(port , function(status, arg) {
});

server = new WebSocketServer({
  httpServer: server
});


function update(connection, text)
{
  if (null == text) {
    text = "" + new Date();
  }
  connection && connection.send(text);
  console.log(text);
}


function start(connection)
{
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(data) {

    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
      try {
        var o = JSON.parse(line);
        line = JSON.stringify(o);
        update(connection, line);
      } catch(err) {
      }
    });
  });
}


server.on('request', function(request) {
  connection = request.accept(null, request.origin);
  start(connection);
});

start();
