<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { initFlowbite } from 'flowbite'
import 'flowbite';

onMounted(() => {
    initFlowbite();
});
</script>

<template>
    <nav class="bg-gray-900 border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a href="/" class="flex items-center">
                <img src="/logo.png" class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">USFX - SIS257</span>
            </a>
            <div class="flex items-center">
                <a href="https://api.whatsapp.com/message/BTD6XIGPZ65SL1"
                    class="mr-6 text-sm  text-gray-500 dark:text-white hover:underline" target="_blank">(+591)
                    734-671-57</a>
            </div>
        </div>
    </nav>
    <nav class="bg-gray-50 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
            <div class="flex items-center">
                <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                    <li>
                        <a href="/ver" class="text-gray-900 dark:text-white hover:underline flex flex-col items-center">
                            <div class="">Ver</div>
                            <lord-icon src="./src/assets/json/ver.json" trigger="hover"
                                style="width:40px;height:40px"></lord-icon>
                        </a>

                    </li>
                    <li>
                        <a href="/ver" class="text-gray-900 dark:text-white hover:underline">
                            <div class="">Crear</div>
                            <lord-icon src="./src/assets/json/crear.json" trigger="hover" style="width:40px;height:40px">
                            </lord-icon>
                        </a>
                    </li>
                    <li>
                        <a href="/ver" class="text-gray-900 dark:text-white hover:underline">
                            <div class="">Editar</div>
                            <lord-icon src="./src/assets/json/editar.json" trigger="hover" style="width:40px;height:40px">
                            </lord-icon>
                        </a>
                    </li>
                    <li>
                        <a href="/ver" class="text-gray-900 dark:text-white hover:underline">
                            <div class="">Eliminar</div>
                            <lord-icon src="./src/assets/json/eliminar.json" trigger="hover" style="width:40px;height:40px">
                            </lord-icon>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
