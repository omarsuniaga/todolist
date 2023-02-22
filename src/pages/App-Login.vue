<script setup>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/firebase";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const email = ref("");
const password = ref("");

const submitForm = async () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user, "Entraste");
      router.push("/home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
</script>

<template>
  <q-form @submit.prevent="submitForm">
    <q-input outlined v-model="email" type="email" label="Email" required />
    <q-input
      outlined
      v-model="password"
      type="password"
      label="Password"
      required
    />
    <q-btn type="submit" color="primary" label="Submit" />
  </q-form>
</template>
