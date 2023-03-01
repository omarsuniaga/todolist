<template>
  <div class="container">
    <div v-if="!loading" class="loading-container">
      <div class="loading"></div>
    </div>
    <div v-else id="rutas-container" v-for="item in Rutas" :key="item.id">
      <button id="rutas">
        <div class="profile">
          <q-img
            :src="(item.img ||= url)"
            @click="store.filtrarPiscinas(item.name)"
          >
          </q-img>
        </div>
        <div class="title">
          <span>{{ item.name }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTodoStore } from "../stores/todo";
import { getRutas } from "../firebase";
const store = useTodoStore();
let loading = ref(false);
let url = ref("https://picsum.photos/200/300");
let Rutas = ref([]);
onMounted(async () => {
  Rutas.value = await getRutas();
  Rutas.value !== [] ? (loading.value = true) : (loading.value = false);
});
</script>
<style>
.container {
  display: flex;
  margin: auto;
  width: 100vw;
  height: 29vh;
  padding-top: 20px;
  align-content: space-between;
  gap: 10px;
  overflow-x: scroll;
}
#rutas-container {
  padding: 15px 0;
}
#rutas {
  border: 0;
  background-color: transparent;
  cursor: pointer;
  margin: 0 auto;
}
#rutas .profile {
  background: rgb(0, 30, 255);
  background: linear-gradient(
    36deg,
    rgb(0, 187, 255) 28%,
    rgb(41, 97, 143) 73%,
    rgb(231, 231, 231) 100%
  );
  padding: 9px;
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  border-radius: 30%;
}
#rutas .profile img {
  width: 100px;
  height: 100px;
  border-radius: 30%;
  padding: 0;
  margin: 0;
  border: 2px solid rgb(59, 137, 221);
  object-fit: cover;
  /* estirar imagen */
}
#rutas .title {
  text-align: center;
  padding: 5px 0;
  color: #fff;
}
/* pantalla para moviles */
@media screen and (max-width: 668px) {
  #rutas .profile {
    background: rgb(255, 201, 0);
    background: linear-gradient(
      36deg,
      rgb(0, 187, 255) 28%,
      rgb(41, 97, 143) 73%,
      rgb(231, 231, 231) 100%
    );
    padding: 4.5px;
    box-sizing: border-box;
    width: 90px;
    height: 90px;
    border-radius: 30%;
  }
  #rutas .profile img {
    width: 80px;
    height: 80px;
    border-radius: 30%;
    padding: 0;
    margin: 0;
    border: 2px solid rgb(255, 255, 255);
  }
}
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

/* Define la animación de carga */
.loading-container .loading {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

/* Define la keyframe de la animación */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
