<template>
  <div class="container">
    <form @submit.prevent="crearProducto" class="form-container">
      <h2 class="">Crear Producto</h2>

      <div class="form-group">
        <div class="row flex space-x-4">
          <div class="w-1/2">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" required />
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row flex space-x-4">
          <div class="col">
            <label for="estado">Estado</label>
            <input type="text" class="form-control" v-model="estado" placeholder="Estado" required />
          </div>

          <div class="col">
            <label for="precio">Precio</label>
            <input type="number" class="form-control" v-model="precio" placeholder="Precio" required />
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row flex space-x-4">
         
          <div class="col">
            <label for="codigoProducto">Código</label>
            <input type="number" class="form-control" v-model="codigoProducto" placeholder="Código Producto" required />
          </div>

          <div class="col">
            <label for="stock">Stock</label>
            <input type="number" class="form-control" v-model="stock" placeholder="Stock" required />
          </div>
   
        </div>
      </div>


      <div class="form-group">
        <div class="row flex space-x-4">

          <div class="col">
            <label for="idCategoriaProductos">Categoría Producto</label>
            <input type="number" class="form-control" v-model="idCategoriaProductos" placeholder="Categoría Producto" required />
          </div>

          <div class="col">
            <label for="descripcion">Descripción</label>
            <input type="text" class="form-control" v-model="descripcion" placeholder="Descripción" required />
          </div>

   
        </div>
      </div>

      
      <div class="form-group">
          <label for="estado" class="form-label">Imagen</label>
          <input
            type="file"
            name="file"
            class="form-input"
            @change="handleImageChange"

            placeholder="imagen"
            required
          />
        </div>


      <div class="text-center">
        <button type="submit" class="btn btn-success btn-lg">Crear</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API || ''
const idCategoriaProductos = ref('')
const codigoProducto = ref('')
const nombre = ref('')
const descripcion = ref('')
const precio = ref('')
const estado = ref('')
const stock = ref('')

const imagen = ref<File | null>(null);

const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  const selectedImage = event.target.files?.[0];
  imagen.value = selectedImage;
};



async function crearProducto() {
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      precio: precio.value,
      descripcion: descripcion.value,
      estado: estado.value,
      stock: stock.value,
      codigoProducto: codigoProducto.value,
      idCategoriaProductos: idCategoriaProductos.value,
      imagen: imagen.value,
    })
    .then(() => router.push('/panel/productos/ver'))
}

function goBack() {
  router.go(-1)
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
}

.form-container {
  max-width: 600px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  margin: 0 auto;
  text-align: left;
}

.form-group {
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-group label {
  width: 20%;
}

.input-group .form-control {
  width: 70%;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
}
</style>