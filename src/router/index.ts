import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import GoogleMapTest from "@/views/GoogleMapTest.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "",
    name: "Vue-google-maps-typescript",
    component: GoogleMapTest
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
