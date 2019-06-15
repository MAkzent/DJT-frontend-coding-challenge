import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Results from "./views/Results.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/:org/:repo/issues",
      name: "issues",
      props: true,
      component: Results
    }
  ]
});
