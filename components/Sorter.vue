<template>
  <div class="sorter">
    <div class="sortHolder">
      <a :class="active === 'All Issues' ? 'active' : ''" @click="changeFilter"
        >All Issues</a
      >
      <a :class="active === 'Open Issues' ? 'active' : ''" @click="changeFilter"
        >Open Issues</a
      >
      <a
        :class="active === 'Closed Issues' ? 'active' : ''"
        @click="changeFilter"
        >Closed Issues</a
      >
      <a
        :class="active === 'Pull Requests' ? 'active' : ''"
        @click="changeFilter"
        >Pull Requests</a
      >
    </div>
    <nuxt-link to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        @click="changeValid"
      >
        <path
          d="M48 4.8L43.2 0 24 19.2 4.8 0 0 4.8 19.2 24 0 43.2 4.8 48 24 28.8 43.2 48l4.8-4.8L28.8 24 48 4.8z"
        />
      </svg>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    filterOptions: {
      "All Issues": "",
      "Open Issues": "open",
      "Closed Issues": "closed",
      "Pull Requests": "pull_request"
    },
    active: "All Issues"
  }),
  methods: {
    changeFilter: function(e) {
      this.active = e.target.text;
      this.$store.dispatch(
        "updateFilteredItem",
        this.filterOptions[e.target.text]
      );
    },
    changeValid: function() {
      this.$store.dispatch("setValid", true);
    }
  }
};
</script>

<style scoped>
.sorter {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.sortHolder {
  display: flex;
  align-items: flex-end;
}

a {
  text-decoration: none;
  color: var(--text-default);
  font-size: var(--para-text);
  padding: 5px;
  cursor: pointer;
}

.active {
  color: var(--bg-main);
}

svg {
  width: 3rem;
  fill: var(--text-default);
}
</style>
