const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// read port from command line
let args = minimist(process.argv.slice(2));

const port = args.port;
let homeContent = "";
let projectContent = "";
let registrationContent = "";

// read home.html 

fs.readFile("home.html",(err,home)=>{
 if(err){
 throw err;
}
 homeContent = home;
});

// read project.html

fs.readFile("project.html",(err,project)=>{

 if(err){
 throw err;
}

projectContent = project;
});

// read registration.html

fs.readFile("registration.html",(err,registration)=>{

  if(err){
  throw err;
}

 registrationContent = registration;
})
// create http server with routes

http.createServer((request,response)=>{

 let url = request.url;

 response.writeHeader(200,{"Content-Type":"text/html"});

 switch(url){
  case "/project":
    response.write(projectContent);
    response.end();
    break;
  case "/registration":
    response.write(registrationContent);
    response.end();
    break;
   default:
    response.write(homeContent);
    response.end();
    break;
};
}).listen(port); //set port 




