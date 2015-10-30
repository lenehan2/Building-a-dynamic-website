var Profile = require("./profile.js");
var renderer = require("./render.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

function home(request,response) {
  //if url is == "/" && GET
  if(request.url === "/"){
    if(request.method.toLowerCase() === "get"){
    //show search
       response.writeHead(200, commonHeaders);
       renderer.view("header", {},response);
       renderer.view("search",{},response);
       renderer.view("footer",{},response);
       response.end();
    }else{
       //if url is == "/" && POST
       // Get the post data from the body
      request.on("data",function(postBody){
      var query = querystring.parse(postBody.toString());
       response.writeHead(303,{location: "/"+query.username});
       response.end();
      })
       // pull the username
        //redirect to /:username
    }
  };
 
};

// Handle HTTP route Get/:username i.e /chalkers
function user(request,response){
  //if url == "/...."
  var username = request.url.replace("/", "");
  
  if(username.length > 0){
     response.writeHead(200, commonHeaders);  
   renderer.view("header",{},response);
     
     //get JSON from treehouse
      
     var studentProfile = new Profile(username);
     //on 'end'
     studentProfile.on("end", function(profileJSON){
      //show profile
       
      //store the values which we need
       
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javaScriptPoints: profileJSON.points.JavaScript
      };
       
      //simple response 
      
   renderer.view("profile",values,response);
   renderer.view("footer",{},response);
   response.end();
     });
    //on "error"
         studentProfile.on("error", function(error){
       //show error
      
       renderer.view("error",{errorMessage: error.message},response);
       renderer.view("search",{},response);
       renderer.view("footer",{},response);
       response.end();
     });
      
  }
}

module.exports.home = home;
module.exports.user = user;











