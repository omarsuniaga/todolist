<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" @click="$router.push('/')" />
      <q-breadcrumbs-el label="Profile" icon="widgets" />
    </q-breadcrumbs>
  </div>
  <div class="q-pa-md q-gutter-md">
    <div class="row justify-between">
      <q-img :src="piscina.img">
        <div class="absolute-full text-subtitle2 flex flex-center">
          <h3 class="text-white">{{ piscina.name }}</h3>
        </div>
      </q-img>
    </div>
  </div>
  <div class="q-pa-md">
    <q-scroll-area style="height: 220px; max-width: 100vw">
      <div class="row no-wrap">
        <div v-for="n in 10" :key="n" style="width: 150px" class="q-pa-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          fuga quae veritatis blanditiis sequi id expedita amet esse aspernatur!
          Iure, doloribus!
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { searchPiscina, getProducts } from "src/firebase";
import { useRouter } from "vue-router";
import { provideDocumentSymbols } from "vls";
let piscina = ref({});
let products = ref([]);
const id = useRouter().currentRoute._rawValue.params.id;
onMounted(async () => {
  piscina.value = await searchPiscina(id);
  // products.value = await getProducts();
  console.log(products.value);
});
</script>
<style>
body {
  background: linear-gradient(to bottom, #87cefa 0%, #1e90ff 100%);
  background-size: 100% 100%;
  animation: waves 10s ease-in-out infinite;
}

@keyframes waves {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
