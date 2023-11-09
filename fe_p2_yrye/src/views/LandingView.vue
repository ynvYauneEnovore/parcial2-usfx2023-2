<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { initFlowbite } from 'flowbite'
import 'flowbite';
import Tema from '@/components/global/tema.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Serie from '@/components/Series/SerieList.vue';
import Galeria from '@/components/landing/galeriaVer.vue';



onMounted(() => {
  initFlowbite();
});



</script>




<template>

<Header />

<main>
    <RouterView />
</main>

<Footer />

</template>


<style>


</style>