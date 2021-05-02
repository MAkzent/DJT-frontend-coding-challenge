<template>
  <div class="cardContainer">
    <div v-if="outputIssues.length < 1" class="noIssues">
      <h1>This repo contains no issues!</h1>
      <h2>Please check that the url is correct!</h2>
    </div>
    <Card v-else v-for="issue in outputIssues" :key="issue.id" :issue="issue" />
  </div>
</template>

<script>
import Card from "../../components/Card";

export default {
  layout: "issues",
  transition: "list-bottom",
  components: {
    Card
  },
  data: () => ({
    allIssues: []
  }),
  watchQuery: ["page"],
  async asyncData({ params, query }) {
    console.log(params);
    const issues = await fetch(
      `https://api.github.com/repos/${params.owner}/${
        params.repo
      }/issues?per_page=${query.per_page}&page=${!query.page ? 1 : query.page}`
    ).then(res => res.json());
    return { issues };
  },
  computed: {
    outputIssues: function() {
      if (!Array.isArray(this.issues)) return [];
      const issueCopy = this.issues.slice(0);
      if (this.filteredItem === "") return issueCopy;
      return issueCopy.filter(this.filterItems);
    },
    filteredItem: function() {
      return this.$store.state.filteredItem;
    }
  },
  methods: {
    filterItems: function(issue) {
      if (this.filteredItem === "open") {
        if (issue.state === "open") {
          return issue;
        }
      }

      if (this.filteredItem === "closed") {
        if (issue.state !== "open") {
          return issue;
        }
      }
      if (this.filteredItem === "pull_request") {
        if (issue[this.filteredItem]) {
          return issue;
        }
      }
    }
  }
};
</script>

<style>
.issueViewer {
  padding: 20px;
}

.noIssues {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  grid-column: 1 / 5;
}

.noIssues h1,
.noIssues h2 {
  color: var(--text-default);
}

.noIssues h1 {
  padding-bottom: 10px;
}

.cardContainer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 15px;
  grid-template-rows: auto;
}

@media screen and (max-width: 1080px) {
  .cardContainer {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 800px) {
  .cardContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .cardContainer {
    grid-template-columns: 100%;
  }
}
</style>
