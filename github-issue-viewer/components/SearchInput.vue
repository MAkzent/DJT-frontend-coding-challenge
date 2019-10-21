<template>
  <div class="search-input-container">
    <SearchIcon class="search-icon" />
    <label v-if="label">{{ label }}</label>
    <input class="search-input" v-bind="$attrs" v-on="inputListeners" />
  </div>
</template>
<script>
import SearchIcon from '~/assets/icons/search.svg'
export default {
  components: {
    SearchIcon
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputListeners() {
      const vm = this

      return Object.assign({}, this.$listeners, {
        input() {
          vm.$emit('input', event.target.value)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.search-input-container {
  position: relative;

  .search-input {
    border: none;
    border-radius: 4px;
    font-family: inherit;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-top: 8px;
    text-indent: 1em;
    width: 100%;

    @include for-tablet-portrait-up {
      font-size: 24px;
      line-height: 2;
      text-indent: 1.5em;
    }
  }

  .search-icon {
    fill: #757575;
    height: 0.75em;
    left: 1em;
    position: absolute;
    top: 0.8em;
    width: 0.75em;

    @include for-tablet-portrait-up {
      height: 1.75em;
      left: 1.5em;
      top: 1.9em;
      width: 1.75em;
    }
  }

  .search-input:focus {
    outline: none;
  }
}
</style>
