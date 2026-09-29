import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import ProfileView from "@/views/ProfileView.vue";
import LikesView from "@/views/LikesView.vue";
import HarryView from "@/views/HarryView.vue";

// Antes el "router" (script.js en la raíz) leía window.location.hash
// (#profile, #likes, #harry) y decidía a mano qué función renderX() pintar
// dentro de #main-container. vue-router hace ese trabajo: a cada ruta le
// asocia un componente y él se encarga de mostrarlo en <router-view />.
const routes = [
  {
    path: "/",
    component: MainLayout, // header + footer, igual que antes vivían solo en index.html
    children: [
      {
        path: "",
        name: "perfil",
        component: ProfileView,
        meta: { title: "Mi perfil - World of Warcraft" },
      },
      {
        path: "gustos",
        name: "gustos",
        component: LikesView,
        meta: { title: "Mis gustos - World of Warcraft" },
      },
      {
        path: "harry",
        name: "harry",
        component: HarryView,
        meta: { title: "Harry Potter" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "activo",
  linkExactActiveClass: "activo",
});

// Antes loadView() hacía document.title = TITLES[view] a mano.
// Aquí lo hacemos una sola vez, de forma centralizada, después de cada
// cambio de ruta, leyendo el título desde route.meta.title.
router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
