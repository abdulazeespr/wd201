const express = require("express");
const app = express();
const { Todo } = require("./models");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

//get Todos
app.get("/todos", async (request, response) => {
  try {
    const todo = await Todo.findAll();
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

//create Todo

app.post("/todos", async (request, response) => {
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
//update Todo
app.put("/todos/:id/markAsCompleted", async (request, response) => {
  const todo = await Todo.findByPk(request.params.id);
  console.log(request.params.id);
  try {
    const updateTodo = await todo.markAsCompleted();

    return response.json(updateTodo);
  } catch (error) {
    return response.status(422).json(error);
  }
});
//delete Todo
app.delete("/todos/:id", (request, response) => {
  response.json({ Todo: "todo is deleted" + request.params.id + "" });
});

app.listen(3000, () => {
  console.log(`Server is start at 3000`);
});
