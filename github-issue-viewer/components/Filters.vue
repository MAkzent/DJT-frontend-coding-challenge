<template>
  <ul class="filter-list">
    <li
      v-for="filter in filters"
      :key="filter"
      :class="[{ active: filter === currentFilter }, filterClass]"
      :data-filter="filter"
      @click="onFilter"
    >
      {{ format(filter) }}
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      filterClass: 'filter',
      currentFilter: 'All',
      filters: ['All', 'Open', 'Closed', 'Pull Request']
    }
  },
  methods: {
    // Ideally format would be a filter, however, since it
    // formats text according to the breakpoint provided
    // by vue-mq, 'this' is needed which requires format to be a
    // method as filters are pure (For more: https://github.com/vuejs/vue/issues/5998)
    format(filter) {
      if (this.$mq === 'sm') {
        return filter === 'Pull Request' ? 'PRs' : filter
      }
      return filter === 'Pull Request' ? 'Pull Requests' : `${filter} Issues`
    },
    onFilter(event) {
      const [filter] = event.target.dataset.filter.match(
        /(All|Open|Closed|Pull Request)/
      )
      this.$emit('filter', filter.toLowerCase())
      this.currentFilter = filter
    }
  }
}
</script>
<style lang="scss">
.filter-list {
  display: flex;
  list-style-type: none;
  margin-bottom: 2em;

  @include for-tablet-portrait-up {
    flex-direction: row;
    margin-bottom: 3em;
  }
}

.active {
  color: #e91e63;
}

.filter {
  cursor: pointer;
  font-size: 16px;
}

.filter:not(:last-child) {
  margin-right: 2em;
}
</style>
