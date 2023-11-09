// themeStore.ts
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    colorTheme: localStorage.getItem("color-theme") || "",
  }),
  actions: {
    toggleTheme() {
      this.colorTheme = this.colorTheme === "light" ? "dark" : "light";
      localStorage.setItem("color-theme", this.colorTheme);
      document.documentElement.classList.toggle("dark");
    },
  },
});
export { defineStore };
