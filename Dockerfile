#!/bin/echo docker build . -f
# -*- coding: utf-8 -*-
# SPDX-License-Identifier: MPL-2.0
#{
# Copyright: 2018-present Samsung Electronics France SAS, and other contributors
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/ .
#}

FROM rzrfreefr/iotjs-express:latest
LABEL maintainer "Philippe Coval (p.coval@samsung.com)"

ENV project aframe-smart-home
WORKDIR /usr/local/opt/${project}/src/${project}/
COPY Makefile /usr/local/opt/${project}/src/${project}/
RUN echo "# log: ${project}: Setup system" \
  && set -x \
  && make setup \
  && sync

COPY . /usr/local/opt/${project}/src/${project}/
RUN echo "# log: ${project}: Building sources" \
  && set -x \
  && make \
  && make modules \
  && make check \
  && make test \
  && sync

EXPOSE 8888
WORKDIR /usr/local/opt/${project}/src/${project}/
ENTRYPOINT [ "/usr/bin/make" ]
CMD [ "start" ]
