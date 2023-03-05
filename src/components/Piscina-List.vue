<template>
  <div class="piscinas-container" v-for="piscina in piscinas" :key="piscina.id">
    <q-card class="my-card" :class="!piscina.state ? 'bg-red-1' : 'bg-green-1'">
      <q-img :src="piscina.img" />
      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 10; right: 12px; transform: translateY(-50%)"
          @click="gps(piscina.coor)"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ piscina.name }}</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          ></div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- <div class="text-subtitle1">{{ piscina.name }}</div> -->
        <div class="text-caption text-grey">
          {{ piscina.root }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="justify-around">
        <q-btn
          flat
          color="primary"
          icon="done"
          @click="router.push('/profile/' + piscina.id)"
        >
          Hacer
        </q-btn>
        <q-btn
          flat
          color="warning"
          icon="delete"
          @click="piscinas_pendientes(piscina)"
        >
          Posponer
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from "vue";
import { getPiscinas } from "../firebase";
import { useTodoStore } from "../stores/todo";
import { useRouter } from "vue-router";

//consumir store
const store = useTodoStore();
let piscinas = computed(() => store.piscinas);
piscinas.value.map((elem) => (elem.state = false));

//consumir router
const router = useRouter();

//Posicionamiento gps
const gps = (coor) => {
  let lat = coor.split(",")[0];
  let lng = coor.split(",")[1];
  window.open(
    `https://www.google.com/maps/search/google+maps+${lat},${lng}?sa=X&ved=2ahUKEwjgh5Shp7v9AhWZRzABHZBFBKcQ8gF6BAgIEAI`,
    "_blank"
  );
};

const piscinas_pendientes = (data) => {
  data.state = false;
  data.commit = "Pendiente...";
  data.products = ["Esto", "Es", "un", "Array"];
  store.addDailyReport(data);
};
</script>
<style>
.piscinas-container {
  margin: 15px auto;

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 20px;
}
.my-card {
  width: 300px;
  max-width: 300px;
  flex-basis: 100px;
  flex-grow: 1;
}
</style>
