<template>
    <div class="galeria">
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.nombre }}
          {{ product.descripcion }}
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface Product {
    id: number;
    name: string;
    // Añade otros campos según la estructura de tus datos
  }
  
  export default {
    setup() {
      const products = ref<Product[]>([]);
  
      const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL_ENDPOINT}productos`);

          products.value = response.data;
        } catch (error) {
          console.error('Error al cargar los datos de la galería', error);
        }
      };
  
      onMounted(() => {
        fetchData();
      });
  
      return {
        products
      };
    }
  };
  </script>


<style>

.galeria {
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
</style>
  