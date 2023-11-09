<script setup lang="ts">
import { onMounted } from 'vue';

import { initFlowbite } from 'flowbite'
import 'flowbite';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

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