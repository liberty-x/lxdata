var handlers = module.exports = {};
var request = require('request');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/../public/index.html');
var app = require('./app.js');
var env = require('env2')('./config.env');
var apiId = process.env.apiId;
var apiKey = process.env.apiKey;
var util = require('util');

var headers = {
    'content-type' : 'text/html'
};

handlers.home = function(req, res) {
  res.writeHead(200, headers);
  res.end(index);
};

handlers.file = function(req, res){
    var file = fs.readFileSync(__dirname + '/../' + req.url);
    var ext = (req.url).split('.')[1];
    res.writeHead(200, {'content-type' : 'text/' + ext});
    res.end(file);
};

handlers.api = function(req, res) {
  var userInput = "";
  req.on("data", function(data) {
    userInput += data;
  });
  req.on("end", function() {
    res.writeHead(200, headers);
    request('https://api.tfl.gov.uk/Line/' + userInput + '/StopPoints?app_id=' + apiId + '&app_key=' + apiKey, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var stationData = app.getStationData(body);
        // start
        var fourLargest = app.getLargestStations(JSON.parse(body));
        var testSample = app.buildGraphObject(fourLargest);
        console.log(util.inspect(JSON.stringify(testSample), false, null));
        // end
        var mapData = app.SpecificTubeLine(body);
        var obj = {
          stationData : stationData,
          mapData : mapData
        };
        // console.log(obj);
        res.end(JSON.stringify(obj));
      }
    });
  });
};

handlers.notFound = function(req, res){
    res.writeHead(404, headers);
    res.end('Resource not found');
};
