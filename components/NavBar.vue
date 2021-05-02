<template>
  <nav>
    <div class="title">
      <h1>GitHub Issue Viewer</h1>
    </div>
    <div class="url">
      <h2>
        {{
          `https://github.com/${this.$route.params.owner}/${this.$route.params.repo}`
        }}
      </h2>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    gitUrl: function() {
      return this.$store.state.searchedUrl;
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100vw;
  background-color: var(--bg-main);
  padding: 20px;
  box-shadow: 0px 2px 10px var(--bg-main);
}

h1 {
  color: white;
  font-size: var(--title-text);
  font-family: "MontBold";
  padding: 0;
}

h2 {
  font-size: var(--para-text);
  color: var(--dark-red);
  font-family: "MontLight";
}

nav div {
  height: inherit;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 900px) {
  .url {
    justify-content: flex-end;
    width: 35%;
  }

  .url h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
