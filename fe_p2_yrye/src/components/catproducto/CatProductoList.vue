<script setup lang="ts">
import type { CatProducto } from '@/models/catproducto'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var catproductos = ref<CatProducto[]>([])

async function getCatProducto() {
  catproductos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/catproducto/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el Intérprete?')
  if (r) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getCatProducto())
  }
}

onMounted(() => {
  getCatProducto()
})
</script>

<template>
  <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
    Categorias</h2>

  <nav class="flex mb-4" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a href="/panel"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          Home
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <a href="/panel/productos/ver"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Productos</a>
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Ver</span>
        </div>
      </li>
    </ol>

    <div class="ml-auto flex items-center">




      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
        class="relative inline-flex items-center justify-center">
      
        <lord-icon
    src="https://cdn.lordicon.com/ftndcppj.json"
    trigger="hover"
    colors="primary:#107c91,secondary:#ebe6ef"
    style="width:50px;height:50px">
</lord-icon>

      </button>



    </div>


  </nav>


  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            N°
          </th>
          <th scope="col" class="px-6 py-3">
            NOMBRE
          </th>
          <th scope="col" class="px-6 py-3">
            DESCRIPCIÓN
          </th>
          <th scope="col" class="px-6 py-3">
            Estado
          </th>
          <th scope="col" class="px-6 py-3">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(catproducto, index) in catproductos.values()" :key="catproducto.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4">
            {{ index + 1 }}
          </td>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ catproducto.nombre }}
          </th>
          <td class="px-6 py-4">
            {{ catproducto.descripcion }}
          </td>
          <td class="px-6 py-4">
            {{ catproducto.estado }}
          </td>
          <td class="px-6 py-4">

            <button class="btn btn-link" @click="toEdit(catproducto.id)">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn btn-link" @click="toDelete(catproducto.id)">
              <span class="material-symbols-outlined">
                delete
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

