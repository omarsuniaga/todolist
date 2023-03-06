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
  <!-- <ItemProducts /> -->
  <div class="q-pa-md">
    <q-scroll-area style="height: 15vw; width: 70vw">
      <div class="row no-wrap">
        <div v-for="(item, index) of products" :key="index">
          <q-btn
            class="q-ma-sm"
            color="primary"
            :label="index"
            @click="onClick(item)"
          />
        </div>
      </div>
    </q-scroll-area>
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Menu</div>
          <div>Selecciona un articulo</div>
        </q-card-section>
        <q-card-section>
          <q-scroll-area style="height: 30vw; width: 70vw">
            <div class="row no-wrap">
              <div v-for="(item, index) of opcion" :key="index" class="q-pa-xs">
                <q-btn @click="select(item)" class="rectangular-button">
                  <div class="button-content">
                    <q-img
                      :src="item.img"
                      spinner-color="primary"
                      spinner-size="82px"
                      :alt="item.name"
                      class="button-image"
                    >
                      <div
                        class="absolute-full text-subtitle2 flex flex-center button-text"
                      >
                        {{ item.name }}
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
                :label-value="
                  seleccion.name + ' : ' + seleccion.cantidad + 'ml'
                "
                label-always
                color="green"
              />
            </div>
            <div class="col-6">
              {{ seleccion.description }}
            </div>
          </div>
        </q-card-section>
        <q-card-section class="row items-center q-gutter-sm">
          <!-- Boton que diga guardar -->
          <q-btn color="primary" label="Guardar" @click="guardar(seleccion)" />
        </q-card-section>
      </q-card>
    </q-dialog>
    para esta piscina se han registrado los siguientes productos:
    <q-list>
      <q-item v-for="(item, index) of store.productsUsed" :key="index">
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label>{{ item.cantidad }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import {
  searchPiscina,
  getProducts,
  ObtenerRegistrosSegunFecha,
} from "src/firebase";
import { useRouter } from "vue-router";
import { useTodoStore } from "../stores/todo";
import { useQuasar } from "quasar";

const id = useRouter().currentRoute._rawValue.params.id;
const $q = useQuasar();
const store = useTodoStore();

let piscina = ref({});
let products = ref([]);
let opcion = ref([]);
let seleccion = ref([]);
let ProductosUsados = ref([]);
let dialog = ref(false);
let ResultadoFecha = ref({});

/* Metodos */

onMounted(async () => {
  piscina.value = await searchPiscina(id);
  products.value = await getProducts();
  ResultadoFecha.value = await ObtenerRegistrosSegunFecha("Alguicidas");
});

const onClick = (index) => {
  opcion.value = index;
  dialog.value = true;
};
const select = (product) => {
  seleccion.value.producto = product; //Nombre del producto seleccionado
  seleccion.value.cantidad = 0; //Cantidad seleccionada de ese producto A: primero extrae el valor de la BBDD si existe, sino B: inicializar en 0 y guardar el valor que seleccione
  seleccion.value.description = product.description; //Descripcion del producto
};
const guardar = (data) => {
  ProductosUsados.value.push({
    cantidad: data.cantidad,
    name: data.producto.name,
  });
  console.log(ProductosUsados.value);
  // let { root, coor, img } = piscina.value; //datos de la piscina
  // let { amount, unit } = data; //datos del producto
  // productos.push({ cantidad: `${amount} ${unit} `, producto: data.name });
  // data.productos = productos;
  // data.root = root;
  // data.coor = coor;
  // data.img = img;
  // store.addProductsUsed(id, data);
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
