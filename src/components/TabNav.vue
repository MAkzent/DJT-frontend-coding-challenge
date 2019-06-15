<template functional>
  <div class="tab-nav">
    <a v-for="tab in props.tabs"
        :key="tab.id"
        :class="{ active: props.active === tab.id }"
        @click="props.callback(tab.id)"
        >{{ tab.title }}</a>
  </div>
</template>

<script>
export default {
  name: "IconInput",
  props: {
    tabs: Array,
    callback: Function,
    active: String
  }
};
</script>