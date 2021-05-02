<template>
  <div class="mainContainer">
    <NavBar />
    <div class="bodyWrap">
      <Sorter />
      <Nuxt />
      <div class="pages">
        <a :class="$route.query.page <= 1 ? 'hidden' : ''" @click="changePage"
          >Back</a
        >
        <h2>{{ $route.query.page }}</h2>
        <a @click="changePage">Next</a>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Sorter from "../components/Sorter";
export default {
  components: {
    NavBar,
    Sorter
  },
  computed: {
    currentPage: function() {
      return this.$route.query.page;
    }
  },
  methods: {
    changePage: function(e) {
      if (e.target.text === "Back") {
        this.$router.push(
          `/${this.$route.params.owner}/${this.$route.params.repo}?per_page${
            this.$route.query.per_page
          }&page=${parseInt(this.$route.query.page) - 1}`
        );
      }
      if (e.target.text === "Next") {
        this.$router.push({
          path: `/${this.$route.params.owner}/${
            this.$route.params.repo
          }?per_page=${this.$route.query.per_page}&page=${parseInt(
            this.$route.query.page
          ) + 1}`
        });
      }
    }
  }
};
</script>

<style>
.issues-enter-active,
.issues-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.issues-enter,
.issues-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}

.mainContainer {
  min-height: 100vh;
}
.bodyWrap {
  padding: 20px;
}

.pages {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.pages a {
  font-size: var(--title-text);
  text-decoration: none;
  cursor: pointer;
}

.hidden {
  visibility: hidden;
}
</style>
