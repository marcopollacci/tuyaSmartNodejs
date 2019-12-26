const TuyAPI = require('tuyapi');
const retry = require('retry');
let status = false;

function generateTuyaClass(id, key, cb){

  let device =  new TuyAPI({
    id: id,
    key: key
  });

  var operation = retry.operation({
    retries: 5,
    factor: 3,
    minTimeout: 1 * 1000,
    maxTimeout: 60 * 1000,
    randomize: true,
  });

  operation.attempt(() => {

   // Find device on network
      device.find().then(() => {
      // Connect to device
      device.connect();
  });

    // Add event listeners
    device.on('connected', () => {
      if(operation.retry()){
        return;
      }
      console.log('Connected to device!');
    });

    device.on('disconnected', () => {
    console.log('Disconnected from device.');
    });

    device.on('error', error => {
      console.log(error);
      if(operation.retry()){
        return;
      }
    });
  });

  return device;

}

function trigger(id, key, use){

    const device = generateTuyaClass(id, key);

    let checkuse = false;

    if(use === 'accendi'){
        checkuse = true;
    }
  
    device.on('data', data => {
      if(typeof data !== undefined){
      //  console.log(`Boolean status of default property: ${data.dps['1']}.`);
      
       // let stato_attuale = data.dps['1'];
    
        let cambio_stato = new Promise((resolve) => {
                device.set({
                  set: checkuse
                });
    
            resolve('ok!');
        })
    
        cambio_stato.then((resolve) => {
            device.disconnect();
        })
      }
    });

};

function triggerMultiple(id, key, use, subdevice) {

    const device = generateTuyaClass(id, key);

    let checkuse = false;

    if(use === 'accendi'){
        checkuse = true;
    }
    device.on('data', data => {
      if(typeof data !== undefined){
      //  console.log(`Boolean status of default property: ${data.dps[subdevice]}.`);
      
      //  let stato_attuale = data.dps[subdevice];
    
        let cambio_stato = new Promise((resolve) => {
                device.set({
                  multiple: true,
                  data: {
                    [subdevice]: checkuse
                  }
                });
    
            resolve('ok!');
        })
    
        cambio_stato.then((resolve) => {
            device.disconnect();
        })
      }
    });
}


var express = require('express');
var app = express();


app.get('/', function (req, res) {
    if("multiple" in req.query){
      //console.log(req.query);
      triggerMultiple(req.query.id, req.query.key, req.query.use, req.query.subdevice);  
    }else{
      trigger(req.query.id, req.query.key, req.query.use);
    }
    res.send('Hello World!');
});

app.listen(8081, function () {});
