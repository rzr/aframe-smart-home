// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0

/**
 *
 * Copyright 2018-present Samsung Electronics France SAS, and other contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/#
 */
AFRAME.registerComponent('solar', {
  schema: {
    level: {type: 'number',
            default: 0}
  },
  init() {
  },

  update(old) {
    try {
      console.log(this.data.level);
      const color = this.el.object3D.children[0].material.color;
      // Custom heatmap formula:
      var hue = (1.0 - Number(this.data.level) / 100.0) * 280.0 / 360.0;
      color.setHSL(hue, 1, 0.5);
    } catch (err) {
    }
  }
});
