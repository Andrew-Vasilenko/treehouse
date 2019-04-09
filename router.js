var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require('querystring');

var commonHeaders = {'Content-Type' : 'text/html'};

function home(request,response){
	if (request.url === '/'){
		if (request.method.toLowerCase() === 'get'){
			response.writeHead(200, commonHeaders);
			renderer.view('header', {}, response);
			renderer.view('search', {}, response);
			renderer.view('footer', {}, response);
			response.end();
		} else {
			//if url == '/' && method == 'POST'

			//get the post data from body
			request.on("data", function(data){
				data = querystring.parse(data.toString());
				console.log(data.username);
				response.writeHead(303, {"Location" : "/" + data.username});
				response.end();
			});
			//extract the username

			//redirect to /:username
		}
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