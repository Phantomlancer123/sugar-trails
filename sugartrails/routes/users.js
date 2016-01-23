var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//router.get('/data', function(req, res, next) {
  // get request on route data
  // require of json file
  // res.send(// json file)
//});

module.exports = router;
