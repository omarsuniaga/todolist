<template>
  <!-- Cabecera -->
  <div id="hero">
    <RutaListVue />
  </div>
  <!-- Cuerpo -->
  <div>
    <div class="row">
      <PiscinaList />
      <div class="col-12"></div>
    </div>
  </div>
  <!-- Pie -->
</template>

<script setup>
import RutaListVue from "../components/Ruta-List.vue";
import PiscinaList from "src/components/Piscina-List.vue";
import { ref, onMounted, computed } from "vue";
import { useTodoStore } from "../stores/todo";
import { getPiscinas } from "../firebase";
</script>
<style>
#hero {
  height: 29vh;
  width: 100vw;

  background-image: url("https://picsum.photos/200/300");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
