const fs = require("fs");

// fs is file system module used to file based functions

// to write into a file first argument is file name you want to change
// second argument is content you want to write into a file
// third argument is a callback function after done  call function

fs.writeFile(
  "sample.txt",
  "Hello World. Welcome to Node.js File System module.",
  (err) => {
    if (err) throw err;
    console.log("File created!");
  }
);

// to read file content
// first argument is file name
// second argument is callback function after done  
fs.readFile("sample.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

// to append content file

fs.appendFile("sample.txt", " This is my updated content", (err) => {
  if (err) throw err;
  console.log("File updated!");
});

//to rename file name

fs.rename("sample.txt", "test.txt", (err) => {
  if (err) throw err;
  console.log("File name updated!");
});

//to delete a file using unlink method of  the fs module

fs.unlink("test.txt", (err) => {
  if (err) throw err;
  console.log("File test.txt deleted successfully!");
});
