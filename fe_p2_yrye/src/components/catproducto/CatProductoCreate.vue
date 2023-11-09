<template>
  <div class="centered-form">
    <div class="form-container">
      <h2 class="form-title">Crear Producto</h2>
      <form @submit.prevent="crearCatProducto" class="form">
        <div class="form-group">
          <label for="nombre" class="form-label">Nombre</label>
          <input
            type="text"
            class="form-input"
            v-model="nombre"
            placeholder="Nombre"
            required
          />
        </div>

        <div class="form-group">
          <label for="descripcion" class="form-label">Descripción</label>
          <input
            type="text"
            class="form-input"
            v-model="descripcion"
            placeholder="Descripción"
            required
          />
        </div>

        <div class="form-group">
          <label for="estado" class="form-label">Estado</label>
          <select class="form-select" v-model="estado" required>
            <option value="1">Disponible</option>
            <option value="0">No Disponible</option>
          </select>
        </div>

        <div class="form-group">
          <button type="submit" class="form-button">Crear</button>
        </div>
      </form>

      <div class="form-group">
        <button class="form-button secondary" @click="goBack">Volver</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
});
</script>

<style scoped>
.centered-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-left: 500px;
}

.form-container {
  background: #ffffff;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 20rem;
}

.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 0.25rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
}

.form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
}

.form-button {
  background-color: #48bb78;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-button:hover {
  background-color: #38a169;
}

.form-button.secondary {
  background-color: #3490dc;
}
</style>
