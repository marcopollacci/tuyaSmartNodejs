const TuyAPI = require('tuyapi');
let status = false;

function trigger(id, key, use){
    const device = new TuyAPI({
        id: id,
        key: key
    });

    let checkuse = false;

    if(use === 'accendi'){
        checkuse = true;
    }

    // Find device on network
        device.find().then(() => {
        // Connect to device
        device.connect();
    });
  
  // Add event listeners
  device.on('connected', () => {
    console.log('Connected to device!');
  });
  
  device.on('disconnected', () => {
    console.log('Disconnected from device.');
  });
  
  device.on('error', error => {
    console.log('Error!', error);
  });
  
  device.on('data', data => {
    console.log('Data from device:', data);
  
    console.log(`Boolean status of default property: ${data.dps['1']}.`);
    
    let stato_attuale = data.dps['1'];

    let cambio_stato = new Promise((resolve) => {
        if(stato_attuale !== checkuse){
            device.set({set: !(data.dps['1'])});
        }

        resolve('ok!');
    })

    cambio_stato.then((resolve) => {
        device.disconnect();
    })

    
  });

}


var express = require('express');
var app = express();


app.get('/', function (req, res) {
    trigger(req.query.id, req.query.key, req.query.use);
    res.send('Hello World!');
});

app.listen(8081, function () {});
