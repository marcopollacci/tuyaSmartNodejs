# Async Script for NodeJS Server based on Tuyapi ( https://codetheweb.github.io/tuyapi/index.html )

## Install
Just clone repository, run npm install

## Usage

### Simple call
- http://127.0.0.1:8081/?id=<id_device>&key=<keydevice>&use=accendi  (to turn on)
- http://127.0.0.1:8081/?id=<id_device>&key=<keydevice>&use=spegni  (to turn off)
### Call to device with multiple switch

- http://127.0.0.1:8081?id=<id_device>&key=<keydevice>&use=accendi&multiple=1&subdevice=<id_switch> (to turn on)
- http://127.0.0.1:8081/?id=<id_device>&key=<keydevice>&use=spegni&multiple=1&subdevice=<id_switch> (to turn off)

