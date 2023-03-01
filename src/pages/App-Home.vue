<script setup>
import { computed, watchEffect, onMounted } from "vue";
import { useTodoStore } from "../stores/todo";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
const store = useTodoStore();
const todos = computed(() => store.todos);
onMounted(() => {
  onValue(ref(db, "Tecnico/"), (snapshot) => {
    const tasks = [];
    snapshot.forEach((childSnapshot) => {
      const task = childSnapshot.val();
      tasks.push(task);
    });
    store.setTasks(tasks);
  });
});
watchEffect(async () => {
  // store.readTodos();
  // console.log("store.id_todos");
});
</script>
<template>
  <q-list>
    <q-item v-for="todo in todos" :key="todo.id" class="grid">
      <q-card
        v-if="!todo.delete"
        :class="[!todo.estado ? 'bg-red-1' : 'bg-green-2']"
        class="my-card"
      >
        <q-card-section class="text-dark">
          <q-item-section class="text-h6">{{ todo.text }}</q-item-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn color="primary" icon="done" @click="store.done(todo)" flat
              >Done</q-btn
            >
            <q-btn
              flat
              color="negative"
              icon="delete"
              @click="store.delete(todo)"
              >Delete</q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-item>
  </q-list>
</template>
<style>
.my-card {
  /* el bloque debe cubrir todo el ancho de la pantalla y estar centrado */
  display: inline;
  /* el bloque debe tener un ancho de 100% */
  width: 100%;
  margin: 0.5rem 0;
}
</style>
