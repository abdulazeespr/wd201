const express = require("express");
const app = express();
const { Todo, User } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const csrf = require("tiny-csrf");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const { title } = require("process");

const saltRounds = 10;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("this is secret key"));
app.use(csrf("123456789iamasecret987654321look", ["POST", "PUT", "DELETE"]));
app.set("view engine", "ejs");
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my-super-secret-key-21770979",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //24hrs
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      User.findone({ where: { email: username, password: password } })
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return error;
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user in session", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Todo application",
    csrfToken: req.csrfToken(),
  });
});

//create user
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup", csrfToken: req.csrfToken() });
});

//create user post

app.post("/user", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // hash passsword
  const hashedPwd = await bcrypt.hash(password, saltRounds);
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPwd,
    });
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/todos");
    });
  } catch (err) {
    console.log(err);
  }
});

app.get(
  "/todos",
  connectEnsureLogin.ensureLoggedIn(),
  async function (request, response) {
    const overdue = await Todo.overdue();
    const dueToday = await Todo.dueToday();
    const dueLater = await Todo.dueLater();
    const CompletedItems = await Todo.CompletedItems();
    if (request.accepts("html")) {
      return response.render("todo", {
        overdue,
        dueToday,
        dueLater,
        CompletedItems,
        csrfToken: request.csrfToken(),
      });
    }
    return response.json({ overdue, dueToday, dueLater, CompletedItems });
  }
);

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
    return response.redirect("/todos");
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
