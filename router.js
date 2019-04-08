var Profile = require("./profile.js");
var renderer = require("./renderer.js");

var commonHeaders = {'Content-Type' : 'text/html'};

function home(request,response){
	if (request.url === '/'){
		response.writeHead(200, commonHeaders);
		renderer.view('header', {}, response);
		renderer.view('search', {}, response);
		renderer.view('footer', {}, response);
		response.end();
	}
};

function user(request,response){
	var username = request.url.replace('/','');
	if (username.length > 0){
		response.writeHead(200, commonHeaders);
		renderer.view('header', {}, response);
		//get JSON from the treehouse
		var studentProfile = new Profile(username);
		//on "end"
		studentProfile.on("end", function(profileJSON){
			//show profile
			// console.log(profileJSON);
			//store the valuse which we need
			var values = {
				'avatarUrl' : profileJSON.gravatar_url,
				'username' : profileJSON.profile_name,
				'badges' : profileJSON.badges.length,
				'javascriptPoints' : profileJSON.points['JavaScript']
			}

			// console.log(values);
			//response
			renderer.view('profile', values, response);
			renderer.view('search', {}, response);
			renderer.view('footer', {}, response);
			response.end();
		});
		//on "error"
		studentProfile.on("error", function(error){
			renderer.view('error', {errorMessage : error.message}, response);
			renderer.view('search', {}, response);
			renderer.view('footer', {}, response);
			response.end();
		});
	}
}

module.exports.home = home;
module.exports.user = user;