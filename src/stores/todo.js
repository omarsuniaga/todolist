import { defineStore } from "pinia";
import { DeleteTask, AddTask, UpdateTask } from "src/firebase";
import { getPiscinas, setDailyReports } from "../firebase";
export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [],
    piscinas: [], // almacena las piscinas que se jalan de la DB
    menu: false,
  }),
  getters: {
    totalPiscinas: (state) => state.piscinas.length,
    piscinasPendientes: (state) =>
      state.piscinas.filter((elem) => elem.state === false),
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
    //Esto es para cambiar el estado del menu
    cambiarMenu(value) {
      value === true ? (value = false) : (value = true);
      this.menu = value;
    },
    //Va a mostrar las piscinas que pertenecen a la misma ruta
    filtrarPiscinas(value) {
      getPiscinas().then((elem) => {
        this.piscinas = elem.filter((el) => (el.root === value ? el : null));
      });
    },
    //Va a poner de ultima posicion en el listado, las piscinas pospuestas
    addDailyReport(data) {
      let id = this.piscinas.indexOf(data);
      if (id !== -1) {
        data.state = false;
        this.piscinas.splice(id, 1); // elimina el objeto del array
        this.piscinas.push(data); // agrega el objeto al final del array
        setDailyReports(data); // almacena en la DB
      }
    },
    addProductsUsed(id, data) {
      setDailyReports(id, data);
    },
  },
});
