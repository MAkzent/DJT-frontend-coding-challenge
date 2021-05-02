<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
@font-face {
  font-family: "MontReg";
  src: url("../_assets/fonts/montserrat-regular.woff"),
    url("../_assets/fonts/montserrat-regular.woff2");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "MontBold";
  src: url("../_assets/fonts/montserrat-bold.woff"),
    url("../_assets/fonts/montserrat-bold.woff2");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "MontLight";
  src: url("../_assets/fonts/montserrat-light.woff"),
    url("../_assets/fonts/montserrat-light.woff2");
  font-weight: lighter;
  font-style: normal;
}

:root {
  --bg-main: #e91e63;
  --card-header: #3f51b5;
  --dark-blue: #1a237e;
  --dark-red: #880e4f;
  --text-default: #607d8b;
  --text-light: #cfd8dc;
  --dark-grey: #455a64;

  --big-text: 48px;
  --head-text: 28px;
  --title-text: 18px;
  --para-text: 12px;
  --mini-text: 9px;
}

html {
  font-family: "MontReg", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 8px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
