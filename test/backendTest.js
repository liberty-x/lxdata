var test = require('tape');
var router = require('../js/router.js');
var shot = require('shot');
var app = require('../js/app.js');
var data = require('./testData.js');
var handlers = require('../js/handlers.js');

test('check server is running', function(t){
  var request = {
    method:'GET',
    url: '/'
  };

  shot.inject(router, request, function(res){
    var actual = res.statusCode;
    var expected = 200;
    t.equal(actual, expected, 'server is up and running');
    t.end();
  });
});


test('check handler can process files', function(t){
  var request = {
    method:'GET',
    url: '/public/style.css'
  };

  shot.inject(router, request, function(res){
    var actual = res.statusCode;
    var expected = 200;
    t.equal(actual, expected, 'handler ready to process files');
    t.end();
  });
});

test('check if 404 is returned if there us an error', function(t){
  var request = {
    method:'GET',
    url: '/fakeurl'
  };

  shot.inject(router, request, function(res){
    var actual = res.statusCode;
    var expected = 404;
    t.equal(actual, expected, '404 error returned');
    t.end();
  });
});

test('Is api request being dealt with by the handler', function(t){
  var request = {
    url: '/apirequest'
  };

  shot.inject(router, request, function(res){
    var actual = res.statusCode;
    var expected = 200;
    t.equal(actual, expected, 'api data received');
    t.end();
  });
});

// test('Is api request being dealt with by the handler', function(t){
//   var userInput = 'victoria';
//   actual =  handlers.apiRequest(userInput);
//   console.log(actual);
//   expected = data.data;
//     t.equal(actual, expected, 'test passed!');
//     t.end();
// });

test('Is an array being returned with wanted data', function(t){
  var body = JSON.stringify(data.data);
  var actual = app.SpecificTubeLine(body);
  var expected = data.expected;
  t.deepEqual(actual, expected, 'test passed!');
  t.end();
});
