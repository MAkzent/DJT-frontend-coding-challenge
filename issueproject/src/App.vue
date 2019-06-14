<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  word-wrap: break-word;
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto;
  margin: 20px;
  grid-column-gap: 10px;
}

.search-form {
  /* width: 10%; */
  display: flex;
  justify-content: center;
  /* border-radius: 40px; */
}

.search-term {
  width: 30%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: orangered;;
  font-size: 20px;
}

.search-button {
  width: 40px;
  height: 36px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

.card {
  text-align: left;
  border-radius: 0;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.13), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  padding: 0 1.6rem;
  margin-bottom: 0.8rem;
}

.text-body {
  font-size: 15px;
  line-height: 20px;
  padding-top: 12px;
  margin-bottom: 1.4rem;
  letter-spacing: 0;
}

.text-headline {
  font-size: 24px;
  line-height: 32px;
  padding-top: 16px;
  margin-bottom: 12px;
  letter-spacing: 0;
}
</style>
