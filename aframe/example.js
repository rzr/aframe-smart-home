// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0

/**
 *
 * Copyright 2019-present Samsung Electronics France SAS, and other contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/#
 */
const express = require('express');
const app = express();
app.use(express.static('..'));
const listener = app.listen(process.env.PORT, function() {
  console.log('Listening to:\nhttp://localhost:' + listener.address().port);
});
