<template>
  <div id="app">
    <Search />
  </div>
</template>

<script>
import Search from "./components/Search.vue";

export default {
  name: "app",
  components: {
    Search
  }
};
</script>

<style>
html,
body {
  background-color: #e91e63;
}
#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
</style>
