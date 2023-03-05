<template>
  <div>
    <q-btn color="warning" icon="logout" label="Salir" @click="Salir" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { CerrarSesion } from "../firebase";
const router = useRouter();
const Salir = () => {
  CerrarSesion().then(() => {
    router.replace("/login");
  });
};
</script>

<style></style>
