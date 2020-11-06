const TuyAPI = require('tuyapi');
const retry = require('retry');
const conversion = require('./conversion');

function generateTuyaClass(id, key){

  let device =  new TuyAPI({
    id: id,
    key: key
  });

  var operation = retry.operation({
    retries: 5
  });

  operation.attempt(() => { //retry if error socket connect

   // Find device on network
    device.find()
    .then(() => {
      // Connect to device
      device.connect().catch(reason =>{
        console.log(reason);
        if(operation.retry(reason)){
          return;
        }
      });
    })
    .catch(reason =>{
      console.log(reason);
      if(operation.retry(reason)){
        return;
      }
    })
    ;

    // Add event listeners
    device.on('connected', () => {
      console.log('Connected to device!');
    });

    device.on('disconnected', () => {
    console.log('Disconnected from device.');
    });

    device.on('error', error => {
      console.log(error);
      if(operation.retry(error)){
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
      if(typeof data !== "undefined"){
    
        let cambio_stato = new Promise((resolve) => {
          device.set({
            set: checkuse
          });
          resolve('ok!');
        });
    
        cambio_stato.then(() => {
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
      if(typeof data !== 'undefined'){
   
        let cambio_stato = new Promise((resolve) => {
            device.set({
              multiple: true,
              data: {
                [subdevice]: checkuse
              }
            });
    
            resolve('ok!');
        })
    
        cambio_stato.then(() => {
            device.disconnect();
        })
      }
    });
}


  /*
  Ref: https://community.jeedom.com/t/plugin-wifilightv2-tuya-smart-life/2635/44
  
    Mode couleur : “21”:“colour”
    Mode blanc : “21”:“white”
    Mode scène : “21”:“scene”

  Intensité
    Eclaire Max : “22”:1000
    Eclaire Moy : “22”:500
    Eclaire Min : “22”:100

  Couleur : J’imagine que ce ne sont pas des couleurs “pures”, mais difficile de faire autrement que par tatonnement
    Rouge : “24”:“000003e803e8”
    Jaune : “24”:“002603e803e8”
    Bleu : “24”:“00df03e803e8”
    Vert : “24”:“007103e803e8”
so, 000003e8 means red, green is 007803e8 and blue 00f003e8
  Scène proposée dans l’appli LSC
    Eblouissant : “25”:“06464601000003e803e800000000464601007803e803e80000000046460100f003e803e800000000”
    Coloré : “25”:“05464601000003e803e800000000464601007803e803e80000000046460100f003e803e800000000”
    Doux : « 25":“04464602007803e803e800000000464602007803e8000a00000000”
    Loisirs : “25”:“030e0d0000000000000001f403e8”
    Travail « 25":“020e0d0000000000000003e803e8”
    Lecture : “25”:“010e0d0000000000000003e803e8”
    Nuit : “25”:“000e0d0000000000000000c803e8”

  */

  
function triggerNooie(id, key, use, temperature = '', mode = '', dimmer = '', colour = '', scene = ''){

  const device = generateTuyaClass(id, key);

  let checkuse = false;

  if(use === 'accendi'){
      checkuse = true;
  }

  device.on('data', async(data) => {
    if(typeof data !== 'undefined'){

      const dataSet = {
        '20': checkuse
      };

      if (mode) {
        dataSet['21'] = mode;
      }

      if (dimmer) {
        dataSet['22'] = (Number(dimmer) * 10);
      }

      if (temperature) {
        dataSet['23'] = temperature;
      }

      if (colour) {
        dataSet['24'] = `${ await conversion.RGBtoHSV(colour)}03e803e8`;
      }

      if (scene) {
          dataSet['25'] = scene;
      }

      let cambio_stato = new Promise((resolve) => {
        device.set({
          multiple: true,
          data: dataSet
        }).then(() => resolve('ok!'))
        .catch(error => console.log(error));
      });
  
      cambio_stato.then(() => {
          device.disconnect();
      })
    }
  });

};


var express = require('express');
var app = express();


app.get('/', function (req, res) {
    if("multiple" in req.query){
      triggerMultiple(req.query.id, req.query.key, req.query.use, req.query.subdevice);  
    } if ("nooie" in req.query) {
      triggerNooie(req.query.id, req.query.key, req.query.use, req.query.temperature, req.query.mode, req.query.dimmer, req.query.colour, req.query.scene);
    }else{
      trigger(req.query.id, req.query.key, req.query.use);
    }
    res.send('Hello World!');
});

app.listen(8081, function () {});
