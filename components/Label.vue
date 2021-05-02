<template>
  <li class="label">
    {{ label.name }}
  </li>
</template>

<script>
export default {
  props: {
    label: {}
  }
};
</script>

<style>
.label {
  display: list-item;
  background-color: var(--bg-main);
  color: white;
  border-radius: 5px;
  padding: 5px;
  max-width: 100px;
  font-size: 9px;
  list-style-type: disc;
  list-style-position: inside;
  text-align: center;
  margin: 8px;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
