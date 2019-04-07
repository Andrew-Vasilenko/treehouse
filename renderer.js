//Function that handles the reading of files and merge in value
//read from file and get a string
//merge values in to string

var fs = require('fs');


function view(templateName, values, response){
	var fileContents = fs.readFileSync('./views/' + templateName + '.html');
	//Insert values to the content

	//Write out the contents
	response.write(fileContents);
}

module.exports.view = view;