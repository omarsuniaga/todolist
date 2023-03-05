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
              <div class="text-h5 q-mt-sm q-mb-xs">{{ product.name }}</div>
              <div class="text-caption text-grey">
                Cantidad del producto usado
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn flat color="dark" label="Share" />
              <q-btn flat color="primary" label="Book" />

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
                  {{ lorem }}
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
let piscina = ref({});
const expanded = ref(false);
let products = ref([]);
const id = useRouter().currentRoute._rawValue.params.id;
onMounted(async () => {
  piscina.value = await searchPiscina(id);
  let { accidos, limpieza } = await getProducts();
  products.value = [...accidos, ...limpieza];
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
