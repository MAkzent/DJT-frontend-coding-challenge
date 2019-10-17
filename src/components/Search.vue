<template>
  <div>
    <h1>Github Issue Viewer</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Paste a link to a Github Repo!" />
      <button>Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    handleSubmit() {
      console.log("search");
    }
  }
};
</script>

<style scoped>
input {
  width: 60vw;
  height: 8vh;
}
button {
  width: 10vw;
  height: 9vh;
  margin-left: 20px;
}
</style>