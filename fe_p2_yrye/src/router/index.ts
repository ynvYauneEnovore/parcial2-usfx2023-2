import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";

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
      ],

    },    

    {
      path: '/serie',
      name: 'serie',
      component: () => import('../views/SeriesView.vue'),
      children: [
        {
          path: '/serie/editar/:id',
          component: () => import('../components/series/SerieEdit.vue'),
          props: route => ({ id: Number(route.params.id) })
        }
      ]
    },


    
  ],
});


export default router;
