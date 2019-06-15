<template functional>
  <div class="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    color: String
  }
};
</script>

<style lang="scss">
.spinner {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;

  > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    margin: 10%;
    width: 80%;
    height: 80%;
    border: 0.75rem solid $red;
    border-radius: 50%;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $red transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
