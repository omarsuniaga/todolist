import { defineStore } from "pinia";
import { DeleteTask, AddTask, UpdateTask } from "src/firebase";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [],
    menu: false,
  }),
  getters: {
    // id: (state) => state.todos.length,
  },
  actions: {
    addTodo(elem) {
      let task = {
        id: this.todos.length === null ? 0 : this.todos.length,
        text: elem,
        estado: false,
      };
      this.todos.push(task);
      AddTask(task);
      this.menu = false;
    },
    done(task) {
      task.estado = !task.estado;
      UpdateTask(task);
    },
    delete(task) {
      try {
        this.todos = this.todos.filter((elem) =>
          elem.id !== task.id ? DeleteTask({ ...task, delete: true }) : null
        );
      } catch (error) {
        console.log(error);
      }
    },
    setTasks(tasks) {
      try {
        this.todos = tasks;
      } catch (error) {
        console.log(error);
      }
    },
    cambiarMenu(value) {
      value === true ? (value = false) : (value = true);
      this.menu = value;
    },
  },
});
