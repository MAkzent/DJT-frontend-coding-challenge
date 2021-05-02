<template>
  <div class="container">
    <h1 class="mainTitle">GitHub Issue Viewer</h1>
    <Search />
    <h2 v-if="valid === false" class="validError">
      This URL doesn't look quite right!
    </h2>
  </div>
</template>

<script>
import Search from "../components/Search";
export default {
  components: {
    Search
  },
  computed: {
    valid: function() {
      return this.$store.state.valid;
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-color: var(--bg-main);
}

.mainTitle {
  font-size: var(--big-text);
  color: white;
  padding-bottom: 20px;
}

.validError {
  padding-top: 20px;
  color: white;
}
</style>
