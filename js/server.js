var http = require('http');
var router  = require('./router.js');
var port = process.env.PORT || 8000;
var app = function(req, res) {
    router(req, res);
};

http.createServer(app).listen(port);
console.log('server listening on port', port);
