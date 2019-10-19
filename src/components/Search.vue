<template>
  <div class="search">
    <h1>Github Issue Viewer</h1>
    <input
      type="text"
      placeholder="Paste a link to a Github Repo!"
      v-model="url"
      v-on:keyup.enter="handleSubmit"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return { url: "" };
  },
  methods: {
    handleSubmit() {
      let parts = this.url.split("/");
      let repo = parts.pop();
      let org = parts.pop();
      let Url = "https://api.github.com/repos/" + org + "/" + repo;
      this.$emit("add:url", Url);
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 0px;
}

.search {
  background-color: #e91e63;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input {
  border: none;
  width: 65vw;
  height: 8vh;
  margin-top: 30px;
  font-size: 20px;
  padding: 10px;
  color: #455a64;
  box-shadow: 0 10px 10px -5px rgb(121, 12, 59);
}
</style>