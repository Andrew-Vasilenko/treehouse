//Create a web server
var http = require('http');
http.createServer(function(request,responce){
	homeRoute(request,responce);
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000');



function homeRoute(request,responce){
	if (request.url === '/'){
		responce.writeHead(200, {'Content-Type' : 'text/plain'});
		responce.write("Header\n");
		responce.write("Search\n");
		responce.end("Footer\n");
	}
};