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
    <RouterView ENDPOINT_API=""></RouterView>
  <Footer />
</template>

<style scoped>
.container {
  margin-top: 6rem;
}
</style>
