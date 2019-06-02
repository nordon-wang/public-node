<template>
  <div id="app">

    <GrlForm />
  </div>
</template>

<script>
import GrlForm from './components/GqlForm'
export default {
  name: 'app',
  components: {
    GrlForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
