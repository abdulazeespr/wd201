

const todoList = require("../todo");

const {all,markAsComplete,add}= todoList();
describe("Todolist Test Suite",()=>{
    beforeAll(()=>{
        add({
            title:"Test tdoo",
            dueDate:new Date().toISOString().split("T")[0],
            completed:false,
        });
    })
    test("should add new todo",()=>{
      let todoitemcount = all.length;
        add({
            title:"Test tdoo",
            dueDate:new Date().toISOString().split("T")[0],
            completed:false,
        })
        expect(all.length).toBe(todoitemcount + 1);
    })

    test("should mark a todo as complete",()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);

    })
})