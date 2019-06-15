<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  font-size: 4px;

  @include media-medium() {
    font-size: 6px;
  }

  @include media-large() {
    font-size: 8px;
  }
}

body {
  margin: 0;
}

#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

h1 {
  font-size: 6rem;
  margin: 0;
}

h2 {
  font-size: 4rem;
  margin: 0;
}

b {
  font-weight: bold;
}

a {
  text-decoration: none;
  color: inherit;
}

p {
  word-wrap: break-word;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
