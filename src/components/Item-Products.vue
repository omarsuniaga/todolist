<template>
  <div class="q-pa-md">
    <div v-for="(item, index) of products" :key="index">
      <q-btn
        class="q-mb-md"
        color="primary"
        :label="index"
        @click="onClick(item)"
      />
    </div>
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Menu</div>
          <div>Selecciona un articulo</div>
        </q-card-section>
        <q-card-section>
          <q-scroll-area style="height: 15vw; width: 70vw">
            <div class="row no-wrap">
              <div v-for="(n, i) of opcion" :key="i" class="q-pa-xs">
                <q-btn @click="select(n)" class="rectangular-button">
                  <div class="button-content">
                    <q-img
                      :src="n.img"
                      spinner-color="primary"
                      spinner-size="82px"
                      :alt="n.name"
                      class="button-image"
                    >
                      <div
                        class="absolute-full text-subtitle2 flex flex-center button-text"
                      >
                        {{ n.name }}
                      </div>
                    </q-img>
                  </div>
                </q-btn>
              </div>
            </div>
          </q-scroll-area>
          <div class="flex row">
            <div class="col-6">
              <q-slider
                v-model="seleccion.cantidad"
                :min="0"
                :max="20"
                label
                :label-value="'Cantidad: ' + seleccion.cantidad + 'ml'"
                label-always
                color="purple"
              />
            </div>
            <div class="col-6">
              {{ seleccion.description }}
            </div>
          </div>
        </q-card-section>
        <q-card-section class="row items-center q-gutter-sm"> </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useTodoStore } from "../stores/todo";
import { ref, onMounted } from "vue";
import { searchPiscina, getProducts } from "src/firebase";
import { useQuasar } from "quasar";
const $q = useQuasar();
let products = ref([]);
let opcion = ref([]);
let seleccion = ref([]);
let dialog = ref(false);
let value = ref(0);
onMounted(async () => {
  products.value = await getProducts();
});
const onClick = (index) => {
  opcion.value = index;
  dialog.value = true;
  console.log();
  // if (index > 1 || dialog2.value) {
  //   $q.notify({
  //     message: `Clicked on menu item #${index} and closed QMenu`,
  //     color: "primary",
  //   });
  // }
};
const select = (index) => {
  seleccion.value = index;
  seleccion.value.cantidad = 0;
  // dialog2.value = true;
};
</script>
<style scoped>
.rectangular-button {
  width: 100px;
  border-radius: 8px;
  height: 100px;
}
.button-content {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  height: 100%;
}
.button-image {
  padding: 0px;
  width: 90px;
  height: 90px;
  border-radius: 8px;
}
.button-text {
  font-size: 12px;
}
</style>
