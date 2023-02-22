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
    console.log("Usuario Deslogeado");
    router.push("/");
  });
};
</script>

<style></style>
