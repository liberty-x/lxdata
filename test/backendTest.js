var test = require('tape');
var router = require('../js/router.js');
var shot = require('shot');

test('check server is running', function(t){
  var request = {
    method:'GET',
    url: '/'
  };

  shot.inject(router, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, 'server is up and running');
    t.end();
  });
});


test('check handler can process files', function(t){
  var request = {
    method:'GET',
    url: '/public/style.css'
  };

  shot.inject(router, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, 'handler ready to process files');
    t.end();
  });
});

test('check if 404 is returned if there us an error', function(t){
  var request = {
    method:'GET',
    url: '/fakeurl'
  };

  shot.inject(router, request, function(res){
    var result = res.statusCode;
    var expected = 404;
    t.equal(expected, result, '404 error returned');
    t.end();
  });
});

test('Is api request returning data', function(t){
  var request = {
    method: 'GET',
    url: '/apirequest'
  };

  shot.inject(router, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, 'api data received');
    t.end();
  });
});

// test('Is random tube line returned', function(t){
//
//   t.equal(expected, result, 'random number returned');
//   t.end();
// });
