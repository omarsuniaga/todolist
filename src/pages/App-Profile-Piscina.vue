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
    <q-scroll-area style="height: 100vh; max-width: 100vw">
      <div class="row no-wrap">
        <div
          v-for="(product, index) in products"
          :key="index"
          style="width: 150px"
          class="q-pa-sm"
        >
          <q-card class="my-card" flat bordered>
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

            <q-card-section>
              <div class="text-overline text-orange-9">Accidos</div>
              <div class="text-h6 q-mt-sm q-mb-xs">{{ product.name }}</div>
              <div class="text-caption text-grey">
                <q-input
                  v-model="product.amount"
                  type="number"
                  label="Cantidad"
                  rounded
                  standout
                />
                <q-select
                  rounded
                  standout
                  v-model="product.unit"
                  :options="options"
                  label="Rounded standout"
                />
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn
                flat
                color="dark"
                label="Guardar"
                @click="guardar(product)"
              />

              <q-space />

              <q-btn
                color="grey"
                round
                flat
                dense
                :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expanded = !expanded"
              />
            </q-card-actions>

            <q-slide-transition>
              <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-subitle2">
                  {{ product.description }}
                </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { searchPiscina, getProducts } from "src/firebase";
import { useRouter } from "vue-router";
import { useTodoStore } from "../stores/todo";

let piscina = ref({});
let products = ref([]);
let productos = [];
const expanded = ref(false);
const id = useRouter().currentRoute._rawValue.params.id;
const options = ref(["ml", "mg"]);
const store = useTodoStore();

const guardar = (data) => {
  let { root, coor, img } = piscina.value; //datos de la piscina
  let { amount, unit } = data; //datos del producto
  productos.push({ cantidad: `${amount} ${unit} `, producto: data.name });
  data.productos = productos;
  data.root = root;
  data.coor = coor;
  data.img = img;
  store.addProductsUsed(id, data);
};

onMounted(async () => {
  piscina.value = await searchPiscina(id);
  let { accidos, limpieza } = await getProducts();
  products.value = [...accidos, ...limpieza];
});
</script>
