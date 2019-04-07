var Profile = require("./profile.js");

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
		//get JSON from the treehouse
		var studentProfile = new Profile(username);
		//on "end"
		studentProfile.on("end", function(profileJSON){
			//show profile

			//store the valuse which we need
			var values = {
				avatarUrl : profileJSON.gravatar_url,
				username : profileJSON.profile_name,
				badges : profileJSON.badges.length,
				javascriptPoints : profileJSON.points['JavaScript']
			};
			//responce
			responce.write(values.username + " has " + values.badges + " badges and " + values.javascriptPoints + "of JS points\n");
			responce.end("Footer\n");
		});
		//on "error"
		studentProfile.on("error", function(error){
			console.log("Error: ", error);
			responce.write("An error occured: " + error + "\n");
			responce.end("Footer\n");
		});
	}
}

module.exports.home = home;
module.exports.user = user;