# Async Script for NodeJS Server based on Tuyapi ( https://codetheweb.github.io/tuyapi/index.html )

[![Total alerts](https://img.shields.io/lgtm/alerts/g/marcopollacci/tuyaSmartNodejs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/marcopollacci/tuyaSmartNodejs/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/marcopollacci/tuyaSmartNodejs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/marcopollacci/tuyaSmartNodejs/context:javascript)

## Install
Just clone repository, run npm install

## Usage

### Simple call
- http://127.0.0.1:8081/?id=<id_device>&key=<key_device>&use=accendi  (to turn on)
- http://127.0.0.1:8081/?id=<id_device>&key=<key_device>&use=spegni  (to turn off)
### Call to device with multiple switch

- http://127.0.0.1:8081?id=<id_device>&key=<key_device>&use=accendi&multiple=1&subdevice=<id_switch> (to turn on)
- http://127.0.0.1:8081/?id=<id_device>&key=<key_device>&use=spegni&multiple=1&subdevice=<id_switch> (to turn off)

### Pm2
Use Pm2 with ecosystem.config.js file include in this project!
