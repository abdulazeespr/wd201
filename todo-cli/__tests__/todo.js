/* eslint-disable no-undef */

const todoList = require("../todo");

let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  .toISOString()
  .split("T")[0];
let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
  .toISOString()
  .split("T")[0];
let today = new Date().toISOString().split("T")[0];
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Submit assignment",
      dueDate: yesterday,
      completed: false,
    });
  });
  test("should add new todo", () => {
    let todoitemcount = all.length;
    add({
      title: "Pay rent",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(todoitemcount + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[1].completed).toBe(false);
    markAsComplete(1);
    expect(all[1].completed).toBe(true);
  });

  test("should retrieval of overdue items", () => {
    expect(overdue()).toEqual([
      {
        title: "Submit assignment",
        dueDate: yesterday,
        completed: false,
      },
    ]);
  });

  test("should retrieval of due today items", () => {
    expect(dueToday()).toEqual([
      {
        title: "Pay rent",
        dueDate: today,
        completed: true,
      },
    ]);
  });

  test("should retrieval of due later items", () => {
    add({ title: "File taxes", dueDate: tomorrow, completed: false });

    expect(dueLater()).toEqual([
      { title: "File taxes", dueDate: tomorrow, completed: false },
    ]);
  });
});
