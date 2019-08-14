// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0

/**
 *
 * Copyright 2018-present Samsung Electronics France SAS, and other contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */
var console = require('console');
// Disable logs here by editing to '!console.log'
var log = console.log || function () {};
var verbose = console.log || function () {};

var webthing = require('webthing-iotjs');
var Property = webthing.Property;
var Value = webthing.Value;
var Thing = webthing.Thing;
var WebThingServer = webthing.WebThingServer;
var SingleThing = webthing.SingleThing;


function SmartHomeThing(name, type, description) {
  var self = this;
  webthing.Thing.call(this,
                      'urn:dev:ops:smarthome-1234',
                      name || 'SmartHome',
                      type || [],
                      description || 'A web connected SmartHome');
  {
    var self = this;
    var url = 'http://rzr.github.io/aframe-smart-home/aframe/';
    this.setUiHref(url);
    var period = 1;

    this.level = new Value(0.0);
    this.pinProperties = [
      new Property(this, 'level', this.level, {
        description: 'Solar sensor level'
      }, {
        minimum: 0,
        maximum: 100
      })
    ];

    this.pinProperties.forEach(function (property) {
      self.addProperty(property);
    });


    this.close = function () {
      self.pinProperties.forEach(function (property) {
        property.close && property.close();
      });
    };

    this.levelOffset = 1;

    this.interval = setInterval(function() {
      var update = self.level.get() + self.levelOffset;
      if (update >= 100) {
        self.levelOffset = -1;
        update = 100;
      }
      if (update <= 0) {
        self.levelOffset = +1;
        update = 0;
      }
      self.level.notifyOfExternalUpdate(update);
    }, 1000 / period);
  }
}

function start() {
  var port = process.argv[2] ? Number(process.argv[2]) : 8888;
  var url = "http://localhost:".concat(port);
  var thing = new SmartHomeThing();
  var server = new webthing.WebThingServer(new webthing.SingleThing(thing), port);
  process.on('SIGINT', function () {
    server.stop();

    var cleanup = function () {
      thing && thing.close();
      process.exit();
    };

    cleanup();
  });
  console.log('Listening:\nhttp://localhost:' + port + '/');
  server.start();
}

module.exports.start = start;

if (module.parent === null) {
  start();
}
