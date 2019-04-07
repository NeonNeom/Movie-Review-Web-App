
<template>
  <div>
    <div class="window">
      <div class="carousel">
        <span class="slide " v-for="(popularMovie, index) in popularMovies" :key="`popMovie-${index}`">
          <img :src="'https://image.tmdb.org/t/p/w300' + popularMovie.poster_path" width="300px"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
//<div style="background-color:firebrick;height: 500px;"></div>

import $ from 'jquery'
import apiKey from '@/services/ApiKey.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      popularMovies: []
    }
  },
  mounted () {
    this.getPopularMovies()
  },
  methods: {
    getPopularMovies () {
      $.ajax({
          url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&release_date=2019&api_key=' + apiKey,
          method: 'GET',
          async: true,
          success: function (data) {
            for(var movieData in data.results){
              this.popularMovies.push(data.results[movieData]);
            }
          }.bind(this),
          error: function (error) {
              console.log(error);
          }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.window {
  overflow: auto;
  position: relative;
  background: #222;

}
.carousel {
  width:max-content;
  position: relative;
  top: 0; left: 0px;
}
.slide {
  background-color: rgb(0, 0, 0);
  height: 450px;
  width: 300px;
  cursor: pointer;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slide:before {
    content: 'lolol';
    position: absolute;
    display: inline-block;
    bottom: 0;
    color: white;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    -webkit-background-image: linear-gradient(to bottom,rgba(0,0,0,0) 50%,#000 100%);
    background-image: linear-gradient(to bottom,rgba(0,0,0,0) 50%,#000 100%);
    transition: all .3s;
    -webkit-transition: all .3s;
}
</style>
