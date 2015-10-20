var handlers = module.exports = {};
var request = require('request');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/public/index.html');

var env = require('env2')('./config.env');
var apiId = process.env.apiId;
var apiKey = process.env.apiKey;

var tubeLine = ['victoria', 'bakerloo'];

var headers = {
    'content-type' : 'text/html'
};

handlers.home = function(req, res) {
  res.writeHead(200, headers);
  res.end(index);
};

handlers.file = function(req, res){
    var file = fs.readFileSync(__dirname + req.url);
    var ext = (req.url).split('.')[1];
    res.writeHead(200, {'content-type' : 'text/' + ext});
    res.end(file);
};

handlers.api = function(req, res){
  res.writeHead(200, headers);
  request('https://api.tfl.gov.uk/Line/' + getRandomTubeLine() + '/StopPoints?app_id=' + apiId + '&app_key=' + apiKey, function(error, response, body) {
    if (!error && response.statusCode == 200) {
    console.log(body);
    res.end(body);
    }
  });
};

function getRandomTubeLine () {
  var i = Math.floor((Math.random() * 13) + 1);
  return tubeLine[i];
}

handlers.notFound = function(req, res){
    res.writeHead(404, headers);
    res.end('Resource not found');
};
