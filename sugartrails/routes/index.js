var request = require('request');
var express = require('express');
var router = express.Router();

var options = {
  url: 'hhttps://jnj-dev.apigee.net/otr/v1/patient/-/healthdata/search?type=bloodGlucose,bolusInsulin,exercise,food&startDate=2016-01-01T00%3A00%3A00&endDate=2016-02-22T00%3A00%3A00&limit=5000&offset=0',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer 0S6SM4v0ioevB4DcB6kGclazPAbh'
  }
};

var info;
function callback(error, response, body) {

  if (!error && response.statusCode == 200) {
    info = JSON.parse(body);
    console.log(info);
  }
}

request(options, callback);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sugar Trails', main:'app'});
});

router.get('/app', function(req, res, next) {
	    console.log(info);

  res.render('app');
});

module.exports = router;
