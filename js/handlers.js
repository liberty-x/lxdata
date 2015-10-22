var handlers = module.exports = {
  apiRequest: apiRequest
};
var request = require('request');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/../public/index.html');
var app = require('./app.js');
var env = require('env2')('./config.env');
var apiId = process.env.apiId;
var apiKey = process.env.apiKey;

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
    apiRequest(userInput);
    res.end();
  });
};

function apiRequest(userInput) {
  console.log("here please");
  request('https://api.tfl.gov.uk/Line/' + 'victoria' + '/StopPoints?app_id=' + '2bacf1ef' + '&app_key=' + '2e9825c8ee28b52fa150660b054030d1', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      app.SpecificTubeLine(body);
    }
  });
}

handlers.notFound = function(req, res){
    res.writeHead(404, headers);
    res.end('Resource not found');
};
