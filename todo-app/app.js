const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const csrf = require("tiny-csrf");
var cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("this is secret key"));
app.use(csrf("123456789iamasecret987654321look", ["POST", "PUT", "DELETE"]));
app.set("view engine", "ejs");

app.get("/", async function (request, response) {
  const overdue = await Todo.overdue();
  const dueToday = await Todo.dueToday();
  const dueLater = await Todo.dueLater();
  const CompletedItems = await Todo.CompletedItems();
  if (request.accepts("html")) {
    return response.render("index", {
      overdue,
      dueToday,
      dueLater,
      CompletedItems,
      csrfToken: request.csrfToken(),
    });
  }
  return response.json({ overdue, dueToday, dueLater, CompletedItems });
});

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE

  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
  try {
    const todos = await Todo.findAll();
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    await Todo.addTodo(request.body);
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  const UpdateValue = request.body.completed;
  console.log(`value is ${UpdateValue}`);
  try {
    const updatedTodo = await todo.setCompletionStatus(UpdateValue);
    return response.json({ updatedTodo });
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)

  const todo = await Todo.findByPk(request.params.id);
  try {
    await todo.deleteTodo();
    return response.json(true);

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return response.status(442).json(false);
  }
});

module.exports = app;
