const app = require("./app");

app.listen(3000, () => {
  console.log("Started express server at port 3000");
});

// const express = require("express");
// const app = express();
// const { Todo } = require("./models");

// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

// //get Todos
// app.get("/todos", async (request, response) => {
//   try {
//     const todo = await Todo.findAll();
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// //create Todo

// app.post("/todos", async (request, response) => {
//   try {
//     const todo = await Todo.addTodo({
//       title: request.body.title,
//       dueDate: request.body.dueDate,
//     });
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });
// //update Todo
// app.put("/todos/:id/markAsCompleted", async (request, response) => {
//   const todo = await Todo.findByPk(request.params.id);

//   try {
//     const updateTodo = await todo.markAsCompleted();

//     return response.json(updateTodo);
//   } catch (error) {
//     return response.status(422).json(error);
//   }
// });
// //delete Todo
// app.delete("/todos/:id", async (request, response) => {
//   const todo = await Todo.findByPk(request.params.id);
//   try {
//     const deleteTodo = await todo.deleteTodo();
//     response.json(deleteTodo);
//   } catch (error) {
//     return response.status(442).json(error);
//   }
// });

// app.listen(3000, () => {
//   console.log(`Server is start at 3000`);
// });
