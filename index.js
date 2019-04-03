//Create a web server
var http = require('http');
http.createServer(function(request,responce){
	responce.writeHead(200, {'Content-Type' : 'text/plain'});
	setInterval(function(){
		responce.write(new Date() + "\n");
	}, 1000);
	responce.write("This is before the end.\n");
	//responce.end("Hello World\n");
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000');