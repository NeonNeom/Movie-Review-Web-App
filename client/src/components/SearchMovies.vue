<template>
  <div class="movieSearch">
  
    <div class="col-xs-3  movieSearchItem" v-for="(movie, index) in movieSearch" :key="index" v-on:click="goToMovieDetails(movie)">
      
      <span v-if="movie.poster_path != null">
        <div class="img-holder">
          <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" width="300px"/>
          <div class="popMovieInfo">
              <div class="movie-rating">
                <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/star-icon.png" width="15px" height="15px"/>
                {{ movie.vote_average }}</div>
              <p class="movie-title"><b>{{ movie.title }}</b></p>
              <span>{{ movie.release_date }}</span>  
          </div>         
        
        </div>
      </span>

      
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
    },
    goToMovieDetails(data){
      this.$router.push({path:'movie-details', query: { id: data.id }});
      //console.log(data);
    }
  }
}
</script>

<style scoped>
.movieSearch{
  max-width: 1570px;
  margin: auto;
  margin-top: 30px;
}
hr{
    width: 80%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 30px;
}

.img-holder:hover{
  cursor: pointer;
}

.movieSearchItem{
  min-height: 500px;
  vertical-align: top;
  display: inline-block;
  margin: 15px;
  position:sticky;
}

.img-holder{
  max-width: 300px;
  overflow: hidden;
  z-index: 50;
  position: sticky;
  margin: auto;
  height: 450px;
}

.img-holder::before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  opacity: 0;
  display: block;
  -webkit-transition: 0.4s ease;
  transition: 0.4s ease;
    background-image: linear-gradient(rgba(32, 51, 226, 0.1) 40%, rgba(0, 0, 0, .8) 100%);
}

.movieSearchItem img{
  -webkit-transition: 0.4s ease;
  transition: 0.4s ease;
}

.img-holder:hover::before{
  opacity: 1;
}

.img-holder:hover img{
  -webkit-transform: scale(1.18);
  transform: scale(1.18);
}

.img-holder{
    box-sizing: border-box;
    width: auto; 
}

.movieSearchItem p{
  box-sizing: border-box;
  margin: auto;
  width: 70%;
  text-align: center;
}


.popMovieInfo{
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  padding-top: 15px;
  z-index: 101;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 1) 100%);
}

.movie-title{
  font-size: 20px;
  margin-bottom: 8px;
  padding: 0px 5px;
  -webkit-transition: 0.4s ease;
  transition: 0.4s ease;
}

.img-holder:hover  .movie-title{
  font-size: 23px;
}
</style>
