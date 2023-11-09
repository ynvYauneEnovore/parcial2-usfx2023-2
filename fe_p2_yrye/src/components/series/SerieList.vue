<script setup lang="ts">
import type { Serie } from '@/models/serie'
import { computed, onMounted, ref, watch } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'flowbite';
import { initFlowbite } from 'flowbite'

const props = defineProps<{
    ENDPOINT_API: string
}>()



const ENDPOINT = props.ENDPOINT_API ?? ''
var series = ref<Serie[]>([])
var currentPage = ref(1)
const seriePerPage = 2

const titulo = ref('')
const sinopsis = ref('')
const director = ref('')
const duracion = ref('')
const fecha_estreno = ref('')

async function getProducto() {
    series.value = await http.get(ENDPOINT).then((response) => response.data)
}

async function crearProducto() {
    await http
        .post(ENDPOINT, {
            titulo: titulo.value,
            sinopsis: sinopsis.value,
            director: director.value,
            duracion: duracion.value,
            fecha_estreno: fecha_estreno.value,
        })
        .then(() => router.push('/ver'));
    await getProducto();
    document.querySelector('[data-modal-hide="authentication-modal"]').click();
    toast.success("Serie creada exitosamente!", {
        position: toast.POSITION.TOP_RIGHT,
    });

    titulo.value = '';
    sinopsis.value = '';
    director.value = null;
    duracion.value = null;
    fecha_estreno.value = null;
}

function toEdit(id: number) {
    router.push(`/serie/editar/${id}`)
}

async function toDelete(id: number) {
    var r = confirm('¿Está seguro que se desea eliminar la Serie?')
    if (r) {
        await http.delete(`${ENDPOINT}/${id}`).then(() => getProducto())
    }
    toast.error("Serie eliminada exitosamente!", {
        position: toast.POSITION.TOP_RIGHT,
    });
}

onMounted(() => {
    getProducto();
    initFlowbite();

})

const displayedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * seriePerPage;
    const endIndex = currentPage.value * seriePerPage;
    return series.value.slice(startIndex, endIndex);
});

// Añadir lógica para manejar la paginación
const totalPages = computed(() => Math.ceil(series.value.length / seriePerPage));

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const goToPage = (pageNumber) => {
    currentPage.value = pageNumber;
};
</script>

<template>
    <div class="container">
        <h2
            class="mb-5 mt-5 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Lista de Series</h2>

        <nav class="flex mb-4" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                    <a href="/"
                        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <a href="/"
                            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Series</a>
                    </div>
                </li>

            </ol>

            <div class="ml-auto flex items-center">




                <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                    class="relative inline-flex items-center justify-center">
                    <lord-icon src="https://cdn.lordicon.com/ftndcppj.json" trigger="hover"
                        colors="primary:#107c91,secondary:#ebe6ef" style="width:50px;height:50px">
                    </lord-icon>

                </button>




            </div>


        </nav>

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            #
                        </th>
                        <th scope="col" class="px-6 py-3">
                            TÍTULO
                        </th>
                        <th scope="col" class="px-6 py-3">
                            SINOPSIS
                        </th>
                        <th scope="col" class="px-6 py-3">
                            DIRECTOR
                        </th>
                        <th scope="col" class="px-6 py-3">
                            DURACIÓN
                        </th>
                        <th scope="col" class="px-6 py-3">
                            FECHA DE ESTRENO
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ACCIÓN
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(serie, index) in displayedProducts" :key="serie.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                        <td class="px-6 py-4">
                            {{ index + 1 }}
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ serie.titulo }}
                        </th>
                        <td class="px-6 py-4">
                            {{ serie.sinopsis }}
                        </td>
                        <td class="px-6 py-4">
                            {{ serie.director }}
                        </td>
                        <td class="px-6 py-4">
                            {{ serie.duracion }}
                        </td>
                        <td class="px-6 py-4">
                            {{ serie.fecha_estreno }}
                        </td>
                        <td class="px-6 py-4">
                            <button class="btn btn-link" @click="toEdit(serie.id)">
                                <lord-icon src="https://cdn.lordicon.com/hifghmba.json" trigger="hover"
                                    style="width:30px;height:30px">
                                </lord-icon>
                            </button>
                            <button class="btn btn-link" @click="toDelete(serie.id)">
                                <lord-icon src="https://cdn.lordicon.com/hjbrplwk.json" trigger="hover"
                                    colors="primary:#646e78,secondary:#0a2e5c,tertiary:#ebe6ef,quaternary:#3a3347"
                                    style="width:30px;height:30px">
                                </lord-icon>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex justify-center mt-3">

            <nav aria-label="Page navigation example">
                <ul class="inline-flex -space-x-px text-sm">
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            @click="previousPage" :disabled="currentPage === 1">
                            Atras
                        </a>
                    </li>
                    <li v-for="pageNumber in totalPages" :key="pageNumber">
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight" :class="{
                            'text-blue-600': currentPage === pageNumber,
                            'text-gray-500': currentPage !== pageNumber,
                            'bg-blue-50': currentPage === pageNumber,
                            'bg-white': currentPage !== pageNumber,
                            'border-gray-300': true,
                            'border': true,
                            'hover:bg-blue-100': currentPage !== pageNumber,
                            'hover:text-blue-700': currentPage !== pageNumber,
                            'dark:bg-gray-700': currentPage === pageNumber,
                            'dark:border-gray-700': currentPage === pageNumber,
                            'dark:text-white': currentPage === pageNumber,
                            'dark:text-gray-400': currentPage !== pageNumber,
                            'dark:hover:bg-gray-700': currentPage !== pageNumber,
                            'dark:hover:text-white': currentPage === pageNumber
                        }" @click="goToPage(pageNumber)">
                            {{ pageNumber }}
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            @click="nextPage" :disabled="currentPage === totalPages">
                            Siguiente
                        </a>
                    </li>
                </ul>
            </nav>

        </div>


        <!-- Main modal -->
        <div id="authentication-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Crear Serie</h3>
                        <form @submit.prevent="crearProducto" class="form-container">
                            <div class="form-group">
                                <div class="row flex space-x-4">
                                    <div class="w-full">
                                        <label for="nombre"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                                        <input type="text"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            v-model="titulo" placeholder="Agregar un título" required />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row flex space-x-4">
                                    <div class="w-full">
                                        <label for="nombre"
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
                                        <label for="nombre"
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
                                        <label for="estado"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duración</label>
                                        <input type="text"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            v-model="duracion" placeholder="Agregar Duración" required />
                                    </div>
                                    <div class="col">
                                        <label for="precio"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Estreno</label>
                                        <input type="date"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            v-model="fecha_estreno" placeholder="Agregar Fecha" required />
                                    </div>
                                </div>
                            </div>
                           
                            <div class="text-center mt-3">
                            <button type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>.container {
    margin: 2%;
}</style>

