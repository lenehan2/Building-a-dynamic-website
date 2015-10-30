var fs = require('fs');


function mergeValues(values,content){
  //cycle over the keys
  
  for(var key in values){
    content = content.replace("{{" + key + "}}",values[key]);
  }
  //replace all the {{key}} with the value from the values object
  
  //return merged content
  return content;
}

//Function that handles the reading of files and merge in value
  //read from file and get string
    //merge values in to string

function view(templateName, values, response) {
  //read from the template files
  
  var fileContents = fs.readFileSync('./views/' + templateName + '.html',{encoding: "utf8"});

  fileContents = mergeValues(values,fileContents);                                     
                                     
  //Insert values in to the content
  
  //Write out the content
  response.write(fileContents);
   
}
                      
module.exports.view = view;    