<template>
  <div class="container">
    <Search />
  </div>
</template>
<script>
import Search from '../components/Search'
export default {
  components: {
    Search
  }
}
</script>
<style lang="scss">
.container {
  align-items: center;
  background-color: #e91e63;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  min-width: 100vw;
  min-height: 100vh;
  text-align: center;
}
</style>
