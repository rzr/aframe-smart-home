# AFRAME-SMART-HOME #

[![GitHub forks](
https://img.shields.io/github/forks/rzr/aframe-smart-home.svg?style=social&label=Fork&maxAge=2592000
)](
https://GitHub.com/rzr/aframe-smart-home/network/
)
[![license](
https://img.shields.io/badge/license-MPL--2.0-blue.svg
)](LICENSE)
[![GitHub version](
https://badge.fury.io/gh/rzr%2Faframe-smart-home.svg
)](
http://badge.fury.io/gh/rzr%2Faframe-smart-home
)
[![NPM](
https://img.shields.io/npm/v/aframe-smart-home.svg
)](
https://www.npmjs.com/package/aframe-smart-home
)

Aframe-smart-home is a demo project illustrating digital twins, using different technologies:

* WoT/Mozilla's WebThing schema to describe resources
* webthing-iotjs to simulate some sensors (only one here)
* aframe for rendering to XR devices
* aframe-webthing to update XR view from webthing


## EXPLANATION: ##

Today, the smart house is empty but has a solar pannel on the roof
and we are monitoring the voltage in real time.

For demo purposes a real model of the house was used along
a tiny but real solar pannel (item found in garden lamp).

[![Real](
https://cf.mastohost.com/v1/AUTH_91eb37814936490c95da7b85993cc2ff/socialsamsunginternet/media_attachments/files/000/017/390/original/2e6e5f0db7a2e189.jpg
)](
https://purl.org/aframe-smart-home#
"#aframe-smart-home")

The output voltage of the solar panel is measured using on board analog input and value is shared to the web using WebThing API.

Then a model can be updated by reading the actual value, the device's color is updated according to an heatmap palette:


[![Demo](
https://repository-images.githubusercontent.com/202191598/26accf00-2da3-11ea-8e6a-f8fdba75e86a#./file/aframe-smart-home.gif
)](
https://rzr.github.io/aframe-smart-home/aframe
"#aframe-smart-home")


## USAGE: ##


### SIMULATOR: ###

Default application is a simulator that mock sensor(s) values.

### CLOUD: ###

Glitch can run this previous simulator

* <https://glitch.com/edit/#!/aframe-smart-home>

### NODE TARGET: ###

Any board with ADC port could be used.

Here an example on ARTIK1020 using webthing-node:

```sh
git clone --depth=1 --recursive https://github.com/rzr/aframe-smart-home
cd aframe-smart-home
make -C example/artik1020/ start
#| Listening:
#| http://localhost:8888/
#| log: ADC: level: open: null (null expected)
#| log: ADC: level: update: 0x2a : 40
#| 0.03515625 V
#| log: ADC: level: change: 48%
#| (...)
```

In other shell value can be queried:

```sh
curl http://artik1020.local:8888/properties
#| {"level":36.69597260346487}p
```

For convenience this can be enabled on boot:
```sh
sudo ln -fs $PWD /usr/local/opt/aframe-smart-home
unit=aframe-smart-home
service=/usr/local/opt/aframe-smart-home/example/artik1020/aframe-smart-home.service
sudo ln -fs $service /usr/lib/systemd/system/
sudo systemctl restart $unit
sudo journalctl -xu $unit
```

### IOTJS TARGET: ###

Any board with ADC port could be used.

It should be easy to adapt from supported boards of webthing-iotjs,
see STM32F7 platform example.

Anyway it's possible to use it on Linux using the same simulator:

```sh
make start
```

### GATEWAY: ###

Mozilla gateway could be also used with additional bearer token.


## RESOURCES: ##

* <https://purl.org/aframe-smart-home>
* <https://rzr.github.io/aframe-smart-home/aframe>
* <https://www.npmjs.com/package/aframe-webthing>
* <https://www.npmjs.com/package/webthing-iotjs>
* <https://www.npmjs.com/package/webthing>
