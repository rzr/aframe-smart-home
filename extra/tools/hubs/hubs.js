// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Indentifier: MPL-2.0
// Copyright: 2020-present Philippe Coval <https://purl.org/rzr/>

console.log("https://github.com/rzr/aframe-smart-home/blob/master/assets/smart-home/smart-home.glb?raw=true")

var a = document.querySelectorAll("[gltf-model-plus]"); var o = a[a.length -1];
console.log(o.object3D.scale);
o.object3D.scale.x = o.object3D.scale.y = o.object3D.scale.z = 15;

var url = 'ws://localhost:1337/'; // TODO: Update with your webthing

var ws;
try { ws.close(); ws=null; } catch(err) {}
ws = new WebSocket(url);

var refresh = false;
var interval = null;
try { clearInterval(interval); } catch(e) {};
interval = setInterval(function() {
  refresh = true;
}, 100);

ws.onmessage = (evt) => {
  let properties = JSON.parse(evt.data);
  let value = - properties.magn[0] / 2;
  if (refresh) {
    refresh = false;
    if (false) console.log(value);
    o.object3D.rotation.y = THREE.Math.degToRad(value);
  }
}
