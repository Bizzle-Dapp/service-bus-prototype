var express = require('express');
var router = express.Router();
var busSend = require('../services/busSendService');
var busReceive = require('../services/busRecieveService');


router.get('/:runType', async function(req, res, next) {
  try{
    let runType = req.params.runType;
    console.log("Starting Retrieve Messages. [GET]");
    switch(runType){
      case "local-api":
        busReceive("local-api");
        break;
      case "local-api2":
        busReceive("local-api2");
        break;
      case "both":
        busReceive("local-api");
        busReceive("local-api2");
        break;
    }
    res.json({message: "Started"});
  } catch(e){
    res.status(500);
  }
});

router.post('/', async function(req, res, next) {
  try{
    console.log("Sending Messages. [POST]");
    await busSend(req.body.messages);
    res.json({message: 'OK'});
  } catch(e){
    res.status(500);
  }
});

module.exports = router;
