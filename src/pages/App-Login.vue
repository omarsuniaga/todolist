<script setup>
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "src/firebase";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    // Iniciar sesión con username y password
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // Redireccionar a la página principal después de iniciar sesión
    router.push("/");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

const loginGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("user", user, token, credential);
        router.replace("/");
      })
      .catch((error) => {
        console.log("error", errorCode);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorMessage);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {});
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login()">
      <input
        type="text"
        name="u"
        placeholder="Username"
        required="required"
        v-model="email"
      />
      <input
        type="password"
        name="p"
        placeholder="Password"
        required="required"
        v-model="password"
      />
      <button
        @click="loginGoogle()"
        class="btn btn-primary btn-block btn-large"
      >
        Google
      </button>
      <button
        type="submit"
        @click="login()"
        class="btn btn-primary btn-block btn-large"
      >
        Iniciar Sesion
      </button>
    </form>
  </div>
</template>
<style>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 300px;
  height: 300px;
}
.login h1 {
  color: #353d93;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 10px;
  background: rgba(124, 227, 235, 0.3);
  padding: 10px;
  font-size: 13px;
  color: #000000;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
}
input:focus {
  box-shadow: inset 0 -5px 45px rgba(44, 0, 243, 0.4),
    0 1px 1px rgba(58, 161, 212, 0.2);
}
</style>
