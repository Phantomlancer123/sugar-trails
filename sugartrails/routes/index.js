var request = require('request');
var express = require('express');
var router = express.Router();
var http = require('http');
var Swagger = require('swagger-client'); 
var moment = require('moment');
var Postmates = require('postmates');
var postmates = new Postmates('cus_KKUFrgxCNKUNiF', '016b79c4-26df-43f2-adec-371c1ba6f433');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sugar Trails', main:'app'});
});

router.get('/app', function(req, res, next) {

   var gL, bgValue;
  var client = new Swagger({
    url: 'http://trident26.cl.datapipe.net/swagger/otr-api.yaml',
    success: function() {
      //TODO: swap out token for  the one you want to use
      var token = 'VcBEa7kanEQEvZeOQdW3WzHTrGJa';
      client.clientAuthorizations.authz.oauth2 =
        new Swagger.ApiKeyAuthorization("Authorization", "Bearer " + token, "header");
  
      client["Health Data"].get_v1_patient_healthdata_search({
        startDate: moment().add(-13, "d").startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
        endDate:   moment().add(1, "d").startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
        type:      "bloodGlucose",
        limit:     5000
      },
      function(result){
        var readings = result.obj.bloodGlucose;
        var dataJSON = JSON.stringify(readings);
        var data = JSON.parse(dataJSON);
        console.log(data);
        
        var bgvalues = []
        for(var i =0; i < data.length; i++){
         bgvalues.push([i*13, data[i].readingDate, data[i].bgValue.value + " mg/dL"]);
       }

       console.log(bgvalues);
          

        res.render('app',{data:bgvalues});

      });
    } 
  });
});

router.get('/postmates', function(req, res, next) {
  var gL, bgValue, deliveryId, food, deliveryStatus;

  var client = new Swagger({
    url: 'http://trident26.cl.datapipe.net/swagger/otr-api.yaml',
    success: function() {
      //TODO: swap out token for  the one you want to use
      var token = 'VcBEa7kanEQEvZeOQdW3WzHTrGJa';
      client.clientAuthorizations.authz.oauth2 =
        new Swagger.ApiKeyAuthorization("Authorization", "Bearer " + token, "header");
  
      client["Health Data"].get_v1_patient_healthdata_search({
        startDate: moment().add(-13, "d").startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
        endDate:   moment().add(1, "d").startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
        type:      "bloodGlucose",
        limit:     5000
      },
      function(result){
        var readings = result.obj.bloodGlucose;
        var dataJSON = JSON.stringify(readings);
        var data = JSON.parse(dataJSON);
        var r = Math.floor(Math.random() * 20 + 1);
        bgValue = data[r].bgValue.value;
        if (bgValue > 180) { 
          gL = "high";
          food = "cucumbers and water";
        } else if (bgValue < 70) {
          // gL = "low";
          food = "sugar";
        } else { 
          gL = "normal";
          food = "anything";
        }

        var deliveryQuote = { 
          pickup_address: "4001 Walnut St, Philadelphia, PA 19104",
          dropoff_address: "Towne Building, Philadelphia, PA"
        }
        
        postmates.quote(delivery, function(err, res) {
          deliveryId = res.body.id;
        });
        
        var delivery = {
          manifest: food,
          pickup_name: "Fresh Grocer",
          pickup_address: "4001 Walnut St, Philadelphia, PA 19104",
          pickup_phone_number: "215-222-9200",
          pickup_business_name: "Fresh Grocer",
          dropoff_name: "Towne Building",
          dropoff_address: "Towne Building, Philadelphia, PA",
          dropoff_phone_number: "415-555-1234",
          quote_id: deliveryId
        };
        
        postmates.new(delivery, function(err, resp) {
          deliveryStatus = resp.body.status;
          res.render('postmates', { 
            myStatus: deliveryStatus,
            glucoseLevel: gL,
            bloodGlucose: bgValue,
            food: food
          });
        });
      });
    } 
  });
});

module.exports = router;
