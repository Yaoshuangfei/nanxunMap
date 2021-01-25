import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/travel",
    name: "travel",
    component: () =>
      import("../views/travel.vue")
  },
  {
    path: "/shamap",
    name: "shamap",
    component: () =>
      import( "../views/shamap.vue")
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
