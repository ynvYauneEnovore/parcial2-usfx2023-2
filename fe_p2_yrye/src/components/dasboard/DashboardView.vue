<template>

  </template>
  
  <script>
  export default {
    data() {
      return {
        randomStats: Math.floor(Math.random() * 100),
        randomItems: [
          { id: 1, name: 'Producto 1' },
          { id: 2, name: 'Producto 2' },
          { id: 3, name: 'Producto 3' },
          // Agrega más elementos aleatorios según sea necesario
        ],
      };
    },
  };
  </script>
  
  <style scoped>

  </style>
  