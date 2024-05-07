import { createRouter, createWebHistory } from "vue-router";
const history = createWebHistory()
//https://router.vuejs.org/guide/essentials/route-matching-syntax.html
const routes = [
  {
    path: "/tts",
    component: () => import("../views/ttsView.vue"),
  },
];
const router = createRouter({
  history,
  routes
})
export default router
