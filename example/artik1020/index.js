// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0

/**
 *
 * Copyright 2018-present Samsung Electronics France SAS, and other contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/
 */

const {
  Thing,
  SingleThing,
  WebThingServer,
} = require('webthing');

const AdcProperty = require('./adc-property');

class SmartHomeThing extends Thing {
  constructor(name, type, description) {
    super(
      'urn:dev:ops:smarthome-1234',
      name || 'SmartHome',
      type || ['MultiLevelSensor'],
      description || 'A web connected SmartHome');
    
    const self = this;
    const url = 'http://rzr.github.io/aframe-smart-home/aframe/';
    this.setUiHref(url);

    this.pinProperties = [
      new AdcProperty(this, 'level', 0,
                      {description: 'A0 on J24 of board'},
                      {direction: 'in',
                       device: '/sys/devices/12d10000.adc/iio:device0\
/in_voltage0_raw'}),

    ];
    this.pinProperties.forEach((property) => {
      self.addProperty(property);
    });
  }

  close() {
    this.pinProperties.forEach((property) => {
      property.close && property.close();
    });
  }
}

module.exports = function() {
  if (!module.exports.instance) {
    module.exports.instance = new SmartHomeThing();
  }
  return module.exports.instance;
};

function start() {
  var port = process.argv[2] ? Number(process.argv[2]) : 8888;
  var url = "http://localhost:".concat(port);
  var thing = new SmartHomeThing();
  var server = new WebThingServer(new SingleThing(thing), port);
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
