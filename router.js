function home(request,responce){
	if (request.url === '/'){
		responce.writeHead(200, {'Content-Type' : 'text/plain'});
		responce.write("Header\n");
		responce.write("Search\n");
		responce.end("Footer\n");
	}
};

function user(request,responce){
	var username = request.url.replace('/','');
	if (username.length > 0){
		responce.writeHead(200, {'Content-Type' : 'text/plain'});
		responce.write("Header\n");
		responce.write(username + "\n");
		responce.end("Footer\n");
	}
}

module.exports.home = home;
module.exports.user = user;