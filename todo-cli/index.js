const { connect } = require("./connectDB");
const Todo = require("./TodoModel");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Second Item",
      dueDate: new Date(),
      completed: false,
    });
    console.log(`Created todo with id : ${todo.id}`);
  } catch (error) {
    console.error(error);
  }
};

const countItems = async () => {
  try {
    const totalCount = await Todo.count();
    console.log(`Found ${totalCount} items in the table`);
  } catch (error) {
    console.error(error);
  }
};

const getAllTodos = async () => {
  try {
    const todos = await Todo.findAll();

    const todoList = todos.map((todo) => todo.displayableString()).join("\n");
    console.log(todoList);
  } catch (error) {
    console.error(error);
  }
};

const getSingleTodos = async () => {
  try {
    const todo = await Todo.findOne();

    console.log(todo.displayableString());
  } catch (error) {
    console.error(error);
  }
};

const udateItem = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteItem = async (id) => {
  try {
    const deleteCountItem = await Todo.destroy({
      where: {
        id: id,
      },
    });

    console.log(`Deleted todo row ${deleteCountItem}`);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await createTodo();
  //await countItems();
  //await getAllTodos();
  // await getSingleTodos();
  await getAllTodos();
  // await udateItem(3);
  //await deleteItem(2);
  await getAllTodos();
})();
