<template>
  <main id="home">
    <div id="search">
      <h1>GitHub Issue Viewer</h1>
      <form v-on:submit.prevent>
        <div class="search-bar" :class="this.step">
          <span>
            <component :is="icon"/>
          </span>
          <input
            v-on:keyup.enter="onEnter"
            v-model="searchLink"
            type="text"
            placeholder="Paste a link to GitHub repo!"
          >
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import Spinner from "@/components/Spinner";
import { debounce } from "@/utils/debounce";
import { getRepositoryFromUrl } from "@/utils/repo";
import SearchIcon from "@/assets/icons/search.svg";
import CheckIcon from "@/assets/icons/check.svg";
import CloseIcon from "@/assets/icons/close.svg";

export default {
  name: "home",
  components: { Spinner, SearchIcon },
  data: function() {
    return {
      searchLink: "",
      step: "input",
      repo: [null, null]
    };
  },
  computed: {
    icon: function() {
      if (this.step === "input") {
        return SearchIcon;
      }
      if (this.step === "validating") {
        return Spinner;
      }
      if (this.step === "valid") {
        return CheckIcon;
      }
      if (this.step === "invalid") {
        return CloseIcon;
      }
    }
  },
  watch: {
    searchLink: function() {
      if (this.searchLink === "") {
        this.step = "input";
      } else {
        this.step = "validating";
        this.debouncedValidate();
      }
    }
  },
  created: function() {
    this.debouncedValidate = debounce(this.validateRepo, 500);
  },
  methods: {
    onEnter() {
      if (this.step !== "valid") return;
      this.$router.push(`/${this.repo[0]}/${this.repo[1]}/issues`);
    },
    validateRepo() {
      this.step = "validating";
      getRepositoryFromUrl(this.searchLink)
        .then(response => {
          const [query, err] = response;
          if (err) {
            this.step = "invalid";
          } else {
            this.step = "valid";
            this.repo = [query.org, query.repo];
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss">
#home {
  height: 100%;
  width: 100%;
  background-color: #e91e63;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;

  #search {
    width: 100%;
    text-align: center;
  }

  h1 {
    color: white;
    margin-bottom: 4rem;
    font-size: 8rem;
  }

  form {
    margin: 0 auto;
    width: 70%;

    @include media-large() {
      width: 55%;
    }

    .search-bar {
      display: flex;
      align-items: center;
      padding: 4rem;
      background-color: white;
      color: $light-grey;
      box-shadow: 3px 10px 12px 3px rgba(0, 0, 0, 0.1);
      span {
        margin: 0;
        font-size: 4rem;
        width: 5rem;
        height: 5rem;

        svg {
          width: 5rem;
          height: 5rem;
          fill: $light-grey;
        }
      }

      &.valid svg {
        fill: $blue;
      }

      input[type="text"] {
        flex-grow: 1;
        border-radius: 0;
        border: none;
        margin-left: 3rem;
        color: #cfd7dc;
        font-size: 4rem;
      }
    }
  }
}
</style>
