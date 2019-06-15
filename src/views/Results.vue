<template>
  <article class="results">
    <header class="header">
      <h1>GitHub Issue Viewer</h1>
      <h2>
        <a :href="url" target="_blank">{{ url }}</a>
      </h2>
    </header>
    <nav>
      <a @click="home">
        <CloseIcon/>
      </a>
    </nav>
    <main class="content" :class="{ working: working, error: err }">
      <TabNav :active="filter" :tabs="filters" :callback="setFilter"/>
      <AnimatedList v-if="!err">
        <li v-for="issue in issues" :key="issue.id">
          <Issue :title="issue.title" :body="issue.body" :labels="issue.labels" :link="issue.url" :closed="issue.state === 'closed'" :pull="issue.isPull"/>
        </li>
      </AnimatedList>
      <p v-if="err" class="message">Oops! Something went wrong :(</p>
      <p v-if="!working && issues.length === 0" class="message">This repository has no issues!</p>
    </main>
    <div class="more">
      <span v-if="working">
        <Spinner />
      </span>
      <button v-else @click="nextPage" >More</button>
    </div>
  </article>
</template>

<script>
import { queryIssues, extend } from "@/utils/issues";
import Issue from "@/components/Issue";
import AnimatedList from "@/components/AnimatedList";
import Spinner from "@/components/Spinner";
import TabNav from "@/components/TabNav";
import CloseIcon from "@/assets/icons/close.svg";

export default {
  name: "Results",
  components: { Issue, AnimatedList, TabNav, CloseIcon, Spinner },
  props: ["org", "repo"],
  data: function() {
    return {
      filters: [
        { id: "all", title: "All Issues" },
        { id: "open", title: "Open Issues" },
        { id: "closed", title: "Closed Issues" },
        { id: "pull", title: "Pull Requests" }
      ],
      filter: "all",
      query: { issues: [], url: "" },
      working: false,
      err: ""
    };
  },
  computed: {
    issues: function() {
      return this.query.issues;
    },
    url: function() {
      return this.query.url;
    }
  },
  watch: {
    filter: function() {
      this.getIssues();
    }
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    setFilter(filter) {
      this.filter = filter;
    },
    getIssues() {
      this.working = true;
      queryIssues(this.org, this.repo, { perPage: 12, filter: this.filter })
        .then(query => this.query = query)
        .catch(err => this.err = err)
        .finally(() => this.working = false)
    },
    nextPage() {
      this.working = true;
      extend(this.query)
        .then(query => this.query = query)
        .catch(err => this.err = err)
        .finally(() => this.working = false);
    }
  },
  mounted() {
    this.getIssues();
  }
};
</script>

<style lang="scss">
.results {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $red;
    padding: 3rem;
    box-shadow: 3px 5px 5px 3px rgba(0, 0, 0, 0.2);
    h1 {
      font-size: 4rem;
      color: white;
      margin-right: 1rem;
    }
    h2 {
      font-size: 2rem;
      color: $dark-red;
    }
  }
  nav {
    text-align: right;
    padding: 3rem 3rem 0 0;

    svg {
      height: 3rem;
      width: 3rem;
      fill: $grey;
      cursor: pointer;
    }
  }

  .content {
    padding: 0 2vw 0 6vw;

    > .tab-nav {
      margin-bottom: 5rem;
      color: $grey;

      a {
        font-size: 2.5rem;
        margin-right: 2rem;
        cursor: pointer;
        padding: 1.5rem 0 0 0;

        &.active {
          color: $red;
        }
      }
    }

    &.working {
      a.active {
        position: relative;
        &:before {
          content: "";
          top: 0;
          left: 0;
          position: absolute;
          border-top: 2px solid $red;
          animation: toFullWidth 1s ease-out infinite alternate;
        }
      }
    }
  }

  .issue-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    position: relative;

    > li {
      width: 100%;
      margin: 0;
      padding: 0 4vw 4vw 0;
      height: 300px;
      overflow: hidden;

      @include media-medium() {
        width: 50%;
      }

      @include media-large() {
        width: 33.33%;
      }
    }
  }

  .message {
    font-size: 3rem;
  }

  .more {
    padding: 4rem;
    text-align: center;

    .spinner {
      width: 5rem;
      height: 5rem;
    }

    button {
      background-color: $red;
      color: $white;
      border-radius: 0;
      border: none;
      padding: 1rem;
      cursor: pointer;
    }
  }
}
</style>
