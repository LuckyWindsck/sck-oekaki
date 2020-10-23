<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
a {
  font-weight: bold;
  color: #42b983;
}
</style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
