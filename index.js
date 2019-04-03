//Create a web server

var router = require('./router');

var http = require('http');
http.createServer(function(request,responce){
	router.home(request,responce);
	router.user(request,responce);
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000');



