//Problem: We need a simple way to look at a users badge count and JavaScript points from a web browser.

//Solution: Use Node.js to perform the profile lookups and serve our template via HTTP

//1. Create a web server

var http = require('http');
var router = require("./router.js");

http.createServer(function (request, response) {
  router.home(request,response);
  router.user(request,response);
}).listen(3000);

console.log('Server running at http://<workspace-url>/');





