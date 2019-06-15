<template functional>
  <span class="tag">
    <a :href="props.link">{{ props.tagName }}</a>
  </span>
</template>

<script>
export default {
  name: "Tag",
  props: {
    tagName: String,
    link: String
  }
};
</script>

<style lang="scss">
.tag {
  border-radius: 10%;
  background-color: $red;
  color: $white;
  font-size: 12px;
  padding: 8px;
  margin-right: 1vw;

  &:before {
    content: "・";
  }
}
</style>
