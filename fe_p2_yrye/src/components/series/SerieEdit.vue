<template>
    <div class="container">
        <button class="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="goBack">Volver</button>

      <h2 class="mb-1 mt-1 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
        Editar Series
      </h2>

      
  
      <div class="row">
        <form @submit.prevent="editarSerie">
            <div class="form-group">
    <div class="row flex space-x-4">
        <div class="w-full">
            <label for="titulo"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
            <input type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="titulo" placeholder="Agregar un título" required />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row flex space-x-4">
        <div class="w-full">
            <label for="sinopsis"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sinopsis</label>
            <input type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="sinopsis" placeholder="Agregar una sinopsis" required />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row flex space-x-4">
        <div class="w-full">
            <label for="director"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Director</label>
            <input type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="director" placeholder="Agregar Nombre del Director" required />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row flex space-x-4">
        <div class="col">
            <label for="duracion"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duración</label>
            <input type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="duracion" placeholder="Agregar Duración" required />
        </div>
        <div class="col">
            <label for="fecha_estreno"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Estreno</label>
            <input type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="fecha_estreno" placeholder="Agregar Fecha" required />
        </div>
    </div>
</div>

<div class="text-center mt-3">
    <button type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
</div>

        </form>
        
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, defineProps } from 'vue';
  import http from '@/plugins/axios';
  import router from '@/router';
  
  
  const props = defineProps<{
    ENDPOINT_API: string;
    id: number;
  }>();
  
  const ENDPOINT = props.ENDPOINT_API ?? '';
  const titulo = ref('');
  const sinopsis = ref('');
  const director = ref('');
  const duracion = ref('');
  const fecha_estreno = ref('');
  
  async function editarSerie() {
  const data = {
    titulo: titulo.value,
    sinopsis: sinopsis.value,
    director: director.value,
    duracion: duracion.value,
    fecha_estreno: fecha_estreno.value
  };

  await http.patch(`${ENDPOINT}/${props.id}`, data)
    .then(() => router.push('/ver'))
    .catch(error => console.error('Error al editar la serie:', error));
}


  async function getSerie() {
  const url = `${ENDPOINT}/${props.id}`;
  console.log('URL de la solicitud:', url);

  await http.get(url).then((response) => {
    titulo.value = response.data.titulo;
    sinopsis.value = response.data.sinopsis;
    director.value = response.data.director;
    duracion.value = response.data.duracion;
    fecha_estreno.value = response.data.fecha_estreno;
  });
}


  
  function goBack() {
    router.go(-1);
  }
  
  onMounted(() => {
    getSerie();
  });
  </script>
  
  <style scoped>
    .container {
      margin: 2%;
    }
  </style>
  