<template functional>
   <transition-group class="issue-list" name="list" tag="ul" appear>
        <slot></slot>
    </transition-group>
</template>

<script>
export default {
  name: "AnimatedList",
};
</script>

<style lang="scss">
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(1, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateY(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>