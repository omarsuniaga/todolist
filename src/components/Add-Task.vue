<template>
  <div>
    <main class="container">
      <q-form @submit.prevent="add()" class="column">
        <q-input
          v-model.trim="task"
          label="Agrega una nueva tarea"
          filled
          type="text"
          color="primary"
          class="q-mb-md column"
        />
        <q-btn type="submit" color="primary" label="Add" />
      </q-form>
    </main>
    <q-footer>
      <CerrarSesion />
    </q-footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "../stores/todo";
import { useRouter } from "vue-router";
import CerrarSesion from "./Cerrar-Sesion.vue";
const router = useRouter();
const store = useTodoStore();
const task = ref("");
const add = () => {
  task.value !== "" ? store.addTodo(task.value) && (task.value = "") : null;
  return task.value;
};

const Cerrar = async () => {
  CerrarSesion().then(() => {
    router.replace("/");
    console.log("Usuario Deslogeado");
  });
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
