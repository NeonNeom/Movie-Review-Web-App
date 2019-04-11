<template>
  <div id="app">
    
    <NavigationBar />
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<style>
#app {
  /* 
  font-family: 'Archivo', sans-serif;
  font-family: 'Montserrat', sans-serif;
  font-family: 'Roboto', sans-serif;
  font-family: 'Fjalla One', sans-serif;
  */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h3{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.img-holder{
    font-family: 'Fjalla One', sans-serif;
}
</style>
