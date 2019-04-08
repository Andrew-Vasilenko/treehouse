//Function that handles the reading of files and merge in value
//read from file and get a string
//merge values in to string

var fs = require('fs');

function mergeValues(values, content) {
	//Cycle over the keys
	for (var key in values) {	//not in all BROWSERS
		//Replace all {{key}} with the values from the values object
		content = content.replace("{{"+ key +"}}", values[key]);
		console.log(key);
	}
	//return merged content
	return content;
};


function view(templateName, values, response){
	//Read from the template file
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding : "utf8"});
	//Insert values to the content
	var t = JSON.stringify(values);
	// console.log(t);
	// console.log(JSON.parse(t));

	fileContents = mergeValues(values, fileContents);
	//Write out the contents
	response.write(fileContents);
};

module.exports.view = view;