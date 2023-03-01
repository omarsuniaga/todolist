<script setup>
import { ref, onMounted } from "vue";
const Rutas = ref([]);
let url = ref("https://picsum.photos/200/300");
// const props = defineProps(["grupo", "rutas"]);
onMounted(async () => {
  console.log("Listado Horizontal", Rutas.value);
  // const Totalrutas = props.rutas;
  // Rutas.value = Totalrutas.filter((elem) =>
  //   elem.grupo.find((e) => e === props.grupo)
  // ).sort((a, b) => a.nombre.localeCompare(b.nombre));
});
</script>

<template>
  <h5 class="text-white q-mx-sm">{{ Rutas }}</h5>
  <div class="container">
    <div id="rutas-container " v-for="item in Rutas" :key="item.id">
      <button id="rutas">
        <div class="profile">
          <q-img
            :src="(item.img ||= url)"
            @click="$router.push('/profile/' + item.id)"
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
<style>
.container {
  display: flex;
  margin: auto;
  width: 100vw;
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
    rgb(0, 30, 255) 28%,
    rgb(156, 90, 134) 73%,
    rgb(60, 26, 81) 100%
  );
  padding: 9px;
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
#rutas .profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  border: 2px solid rgb(248, 248, 248);
  object-fit: cover;
  /* estirar imagen */
}
#rutas .title {
  text-align: center;
  padding: 5px 0;
  color: #fff;
}
#rutas.active .profile {
  animation-duration: 1s;
  animation-name: contorno;
  animation-iteration-count: infinite;
}

@keyframes contorno {
  0% {
    background: linear-gradient(
      36deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  10% {
    background: linear-gradient(
      72deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  20% {
    background: linear-gradient(
      108deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  30% {
    background: linear-gradient(
      144deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  40% {
    background: linear-gradient(
      180deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  50% {
    background: linear-gradient(
      216deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  60% {
    background: linear-gradient(
      252deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  70% {
    background: linear-gradient(
      288deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  80% {
    background: linear-gradient(
      324deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  90% {
    background: linear-gradient(
      360deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 30, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
  100% {
    background: linear-gradient(
      396deg,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 0%,
      rgb(0, 26, 255) 28%,
      rgb(227, 38, 164) 73%,
      rgb(96, 28, 137) 100%
    );
  }
}
/* pantalla para moviles */
@media screen and (max-width: 668px) {
  #rutas .profile {
    background: rgb(255, 201, 0);
    background: linear-gradient(
      36deg,
      rgb(0, 30, 255) 13%,
      rgb(227, 38, 164) 73%,
      rgb(255, 9, 057) 100%
    );
    padding: 4.5px;
    box-sizing: border-box;
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
  #rutas .profile img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    padding: 0;
    margin: 0;
    border: 2px solid rgb(255, 255, 255);
  }
}
</style>
