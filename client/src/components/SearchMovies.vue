<template>
  <div class="movieSearch">
    <h1>Movies</h1>
    <hr>
    <div v-for="(movie, index) in movieSearch" :key="index">
      <p>
        <span><b>{{ movie.title }}</b></span><br />
        <span>{{ movie.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import apiKey from '@/services/ApiKey.js'
import { EventBus } from '@/services/Bus.js';

export default {
  name: 'search',
  data () {
    return {
      movieSearch: []
    }
  },
  created() {
    EventBus.$on('updateSearch', data => {
      // You can then call your method attached to this component here
      this.searchMovies();
    });
  },
  mounted () {
    this.searchMovies()
  },
  methods: {
    async search () {
        console.log(this.$route.query)
      //const response = await PostsService.fetchPosts()
      //this.movieSearch = response.data
    },
    searchMovies () {
        this.movieSearch = [];
      $.ajax({
          url: 'https://api.themoviedb.org/3/search/movie?language=en-US&page=1&api_key=' + apiKey + '&query=' + this.$route.query.query,
          method: 'GET',
          async: true,
          success: function (data) {
            for(var movieData in data.results){
              this.movieSearch.push(data.results[movieData]);
             
            }
              console.log(data.results);
          }.bind(this),
          error: function (error) {
              console.log(error);
          }
      });
    }
  }
}
</script>

<style scoped>
.movieSearch{
  margin-top: 30px;
}
hr{
    width: 80%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 30px;
}
</style>
