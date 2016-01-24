var request = require('request');
var express = require('express');
var router = express.Router();
var http = require('http');
var Swagger = require('swagger-client'); 
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sugar Trails', main:'app'});
});

router.get('/app', function(req, res, next) {
  res.render('app');
});

router.get('/postmates', function(req, res, next) {

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
        console.log(result);
        var readings = result.obj.bloodGlucose;
        var dataJSON = JSON.stringify(readings);
        console.log(res);
        var data = JSON.parse(dataJSON);
        for (var i in data) {
          var bgValue = data[i].bgValue.value;
          if (bgValue > 180) { 
            console.log("high");
          } else if (bgValue < 70) { 
            console.log("low");
          } else { 
            console.log("normal");
          }
        }
      });
    } 
  });           
  
    res.render('postmates');
  });

module.exports = router;
