<template>
  <div class="input-container">
    <label v-if="label">{{ label }}</label>
    <input :value="value" v-bind="$attrs" v-on="inputListeners" />
  </div>
</template>
<script>
export default {
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
.input-container {
  input {
    border: none;
    border-radius: 4px;
    font-family: inherit;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-top: 8px;
    width: 100%;

    @include for-tablet-portrait-up {
      font-size: 24px;
      line-height: 2;
    }
  }

  input:focus {
    outline: none;
  }
}
</style>
