<template>
  <button @click="toggleTheme">
    <lord-icon
      :src="iconSrc"
      :colors="ColorSrc"
      trigger="hover"
      stroke="bold"
      style="width:40px;height:40px"
    ></lord-icon>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/stores/teme';

const themeStore = useThemeStore();
const iconSrc = ref(getIconSrc());
const ColorSrc = ref(getIconColor());

function getIconSrc() {
  return themeStore.colorTheme === 'light'
    ? 'https://cdn.lordicon.com/awjihmup.json'
    : 'https://cdn.lordicon.com/cehbqtgh.json';
}

function getIconColor() {
  return themeStore.colorTheme === 'light'
    ? 'primary:#000,secondary:#000'
    : 'primary:#fff,secondary:#fff';
}

const toggleTheme = () => {
  themeStore.toggleTheme();
  iconSrc.value = getIconSrc();
  ColorSrc.value = getIconColor();

}
</script>
