import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import GoogleMapTest from "@/views/GoogleMapTest.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/test/",
    name: "Google Map Test Component",
    component: GoogleMapTest,
    children: [
      {
        path: "marker",
        name: "Marker",
        component: () => import("@/views/MarkerTest.vue")
      },
      {
        path: "autocomplete",
        name: "Autocomplete",
        component: () => import("@/views/AutocompleteTest.vue")
      },
      {
        path: "direction",
        name: "Direction",
        component: () => import("@/views/DirectionTest.vue")
      },
      {
        path: "distance-matrix",
        name: "Distance Matrix",
        component: () => import("@/views/DistanceMatrixTest.vue")
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
