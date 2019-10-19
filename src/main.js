import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Results from "./components/Results.vue";
import Search from "./components/Search.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { path: "/results", component: Results, props: true },
  { path: "/search", component: Search, props: true }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
