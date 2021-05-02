<template>
  <div class="searchWrap">
    <input
      type="text"
      placeholder="Paste a link to a GitHub Repo!"
      @keyup.enter="output"
    />
    <svg width="28" height="28" viewBox="0 0 28 28">
      <path
        d="M18 16.5l-5.14-5.18h-.35a7 7 0 10-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 112 7a5 5 0 0110 0z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  methods: {
    parseSearch: function(fullUrl) {
      const result = fullUrl.split("/");
      return [result[3], result[4]];
    },
    output: function(e) {
      const deconstructedUrl = this.parseSearch(e.target.value);
      if (!this.checkUrl(e.target.value)) {
        this.$store.dispatch("setValid", false);
        return;
      }
      this.$store.commit("updateParsedSearch", deconstructedUrl);
      this.$router.push(
        `/${deconstructedUrl[0]}/${deconstructedUrl[1]}?per_page=12&page=1`
      );
    },
    checkUrl: function(url) {
      const exp = /https:\/\/github\.com\//;
      const regex = new RegExp(exp);
      const match = regex.test(url);

      return match;
    }
  }
};
</script>

<style scoped>
.searchWrap {
  width: 60%;
  position: relative;
}

.searchWrap input {
  width: 100%;
  height: 60px;
  padding: 0;
  border: none;
  padding-left: 2em;
  font-size: var(--title-text);
  font-weight: lighter;
}

svg {
  position: absolute;
  left: 1em;
  vertical-align: bottom;
  top: 2.5em;
  fill: #a5a5a5;
}

@media screen and (max-width: 480px) {
  .searchWrap {
    width: 80%;
  }

  svg {
    top: 35%;
  }
}

@media screen and (max-width: 1080px) {
  svg {
    top: 36%;
  }
}
</style>
