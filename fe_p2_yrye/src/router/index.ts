import { createRouter, createWebHistory } from "vue-router";
import PanelView from "@/views/PanelView.vue";
import LoginView from "@/views/LoginView.vue";
import LandingView from "@/views/LandingView.vue";
import ProductoView from "@/views/ProductoView.vue";
import CatproductoView from "@/views/catproductoView.vue";
import Galeria from '@/components/landing/galeriaVer.vue';


import AyudaView from "@/views/AyudaView.vue";
import { useAuthStore } from "@/stores";
import { getTokenFromLocalStorage } from "@/helpers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,

      children: [
        {
          path: "",
          component: () => import("../components/landing/galeriaVer.vue"),
        },
        {
          path: "ver",
          component: () => import("../components/series/SerieList.vue"),
        },
        {
          path: "editar",
          component: () => import("../components/series/SerieEdit.vue"),
        },
      ],

    },    
    
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/login", "/landing", "/", "/ver", "/editar", "/galeria"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout();
    authStore.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;
