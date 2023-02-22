<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="Drawer" />
        <q-toolbar-title>
          TodoList /Quasar/Firebase9/Pinia/VueRouter/SheetGoogle/Vue3
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="Open" side="left">
      <!-- Componente de Busquedad -->
      <Add_Task />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { defineComponent, ref, computed } from "vue";
import Add_Task from "src/components/Add-Task.vue";
import { useTodoStore } from "../stores/todo";

const store = useTodoStore();
let Open = ref(store.menu);

const Drawer = () => {
  Open.value = !Open.value;
  store.cambiarMenu(Open.value);
};
</script>
