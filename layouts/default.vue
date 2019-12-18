<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: Montserrat;
  src: url('~assets/fonts/montserrat-bold.woff2') format('woff2'),
    url('~assets/fonts/montserrat-bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: Montserrat;
  src: url('~assets/fonts/montserrat-light.woff2') format('woff2'),
    url('~assets/fonts/montserrat-light.woff') format('woff');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: Montserrat;
  src: url('~assets/fonts/montserrat-regular.woff2') format('woff2'),
    url('~assets/fonts/montserrat-regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

html {
  font-family: Montserrat, 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  line-height: 1.4;
}

body {
  overflow: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.4s;
}

.bounce-leave-active {
  animation: bounce-out 0.25s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
