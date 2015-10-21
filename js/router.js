var handlers = require('./handlers.js');

var routes = {
    '/'   : handlers.home,
    '/apirequest' : handlers.api,
    '/public/style.css'  : handlers.file,
    '/public/frontend.js' : handlers.file,
    '404' : handlers.notFound
};

module.exports = function (req, res) {
  console.log(req.url);
    if (routes[req.url]) {
	routes[req.url](req, res);
    } else {
	routes['404'](req, res);
    }
};
