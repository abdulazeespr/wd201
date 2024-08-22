const http = require("http");
const fs = require("fs");

// read content from the home.html file and display it broswer
fs.readFile("home.html",(err,home) => {

 if(err) throw err; //throw error  anything wrong
// create httpserver 
  http.createServer((request, response)=>{
 //it have request and response
   //set Header to inform the browser what content is served
   response.writeHeader(200,{"Content-Type":"text/html"});
   //to transmit content where  home.html
   response.write(home);
   response.end();
}).listen(3000);

});



