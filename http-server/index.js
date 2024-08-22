const minimist = require("minimist");

let args = minimist(process.argv.slice(2), {
 alias: {
   n: "name",
   a: "age",
 },
default:{
 greeting:"hello",
},
});

console.log(args);
