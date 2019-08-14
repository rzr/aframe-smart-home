#!/bin/bash
set -x
#set -e

SELF=$(basename -- "$0")
SELFDIR=$(dirname -- "$0")
TOPDIR=$(realpath "${SELFDIR}/../..")

#TODO adapt
user="${USER}"
user="user"

HOME="/home/$user"
file="${HOME}/.bashrc"
export NVM_DIR="$HOME/.nvm"

if [ -x "$NVM_DIR" ] ; then
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
else
    unset NVM_DIR
    export NODE_VERSION="v12"
    export NVM_VERSION='v0.34.0'
    url="https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh"
    touch ~/.`basename $(echo $SHELL)`rc
    curl -o- $url | bash # -x # -e
    nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION}
fi

node --version

cd ${TODPIR}
make -C aframe-smart-home/example/artik1020 start
