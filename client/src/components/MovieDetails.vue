<template>
  <div v-if="isLoaded" class="movie-details">
    <Recommend :movieId="this.$route.query.id" :showElement.sync="modalIsVisible"></Recommend>
    <div v-if="movie.backdrop_path != null" class="backdrop" :style="'background-image:url(https://image.tmdb.org/t/p/original/' + movie.backdrop_path + ');background-repeat:no-repeat;background-size: cover;background-position: 50% 50%;'">

        <div class="movie-rating col-sm-10">
            <div class="col-sm-3" style="min-width: 300px"></div>
            <div class="movie-rating-offset col-sm-7">

                <h1>{{movie.original_title}}</h1>
                <p>
                    <span v-for="(item, index) in movie.genres.slice(0,2)" :key="index"> 
                        {{item.name}}
                        <span class="comma" v-if="index == 0 && movie.genres.length != 1">, </span>
                    </span>
                    &nbsp;|&nbsp; {{movie.runtime}} Min
                </p>
                <p>
                    <b>Rating:</b> 
                    <span v-for="index in 10" :key="index">
                        <span v-if="index <= movie.vote_average">
                            <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/star-icon.png" width="15px" height="15px"/>
                        </span>
                        <span v-else>
                            <img src="https://png.pngtree.com/svg/20170330/6a1d534b9d.svg" width="15px" height="15px"/>
                        </span>
                    </span>
                    {{movie.vote_average}}
                </p>
                <div class="my-rating" v-on:click="showModal()">

                </div>
            </div>
        </div>
    
    </div>
    
    <div class="col-sm-10 movie-content">
        <div class="col-sm-3 movie-card">
            <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" width="100%"/>
            <h3>Movie Info</h3>
            <p> <b>Release Date:</b> {{movie.release_date}}
            </p>
            <p>
                <b>Genres: </b> 
                <span v-for="(item, index) in movie.genres" :key="index"> 
                    {{item.name}}
                    <span class="comma" v-if="index != movie.genres.length - 1">, </span>
                </span>
            </p>
            <p>
                 <b>Country:</b> {{movie.production_countries[0].name}}
            </p>
            <p>
                <b>Language:</b> {{movie.original_language}}
            </p>
        </div>
        <div class="col-sm-7 movie-description">
            <h3>Description</h3>
            <p>
                {{movie.overview}}
            </p>
        </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'
import apiKey from '@/services/ApiKey.js'
import Recommend from '@/components/Recommend.vue';

export default {
  name: 'moviedetails',
  data () {
    return {
      movie: {},
      isLoaded: false,
      modalIsVisible : true
    }
  },
  components:{
      Recommend
  },
  mounted () {
    this.getMovieDetails();
  },
  methods: {
    getMovieDetails(){
        $.ajax({
          url: 'https://api.themoviedb.org/3/movie/' + this.$route.query.id + '?language=en-US&page=1&api_key=' + apiKey,
          method: 'GET',
          async: true,
          success: function (data) {
              this.movie = data;
              console.log(data);
              this.isLoaded = true;
          }.bind(this),
          error: function (error) {
              console.log(error);
          }
        });
    },
    showModal(){
        if(this.modalIsVisible){
            this.modalIsVisible = false;
        }else{
            this.modalIsVisible = true;
        }
    }
  }
}
</script>

<style scoped>
b{
    font-weight: 600;
}

.comma{
    margin-left: -3px;
}

.backdrop{
    width: 100%;
    padding-top: 250px;
    height: 500px;
    position: sticky;
    background-color: black;
}

.backdrop::before {
  content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 380px;
    -webkit-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
    background-image: -webkit-linear-gradient(to bottom,rgba(0,0,0,0) 0%,#000000 90%);
    background-image: -moz-linear-gradient(to bottom,rgba(0,0,0,0) 0%,#000000 90%);
    background-image: -o-linear-gradient(to bottom,rgba(0,0,0,0) 0%,#000000 90%);
    background-image: -ms-linear-gradient(to bottom,rgba(0,0,0,0) 0%,#000000 90%);
    background-image: linear-gradient(to bottom,rgba(0,0,0,0) 0%,#000000 90%);
}

.movie-rating{
    height: 250px;
    margin: auto;
    padding: 0px;
}

.movie-rating > *{
    height: 250px;
    display: inline-block;
    vertical-align: top;
    text-align: left;
    color: white;
}

.movie-rating-offset{
    padding-top: 45px;
    font-family: 'Montserrat', sans-serif;
}

.my-rating{
    height: 50px;
    width: 50px;
    border-radius: 300px;
    background-color:#c75c5c;
    background-image: url('../assets/recommendIcon.png');
    background-repeat:no-repeat;
    background-size:cover;
    background-size: 30px;
    background-position: 50% 50%;
    position: absolute;
    top: 120px;
    right: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.my-rating:hover{
    cursor: pointer;
    background-color:#f02727;
}

.movie-content{
    margin: auto;
    padding: 0;
    height: 100vh;
}

.movie-content > *{
    vertical-align: top;
    display: inline-block;
}


.movie-card{
    margin-top: -280px; 
    text-align: left;
    min-width: 300px;
}

.movie-card > *{
    margin-bottom: 25px;
}

.movie-card p{
    margin-bottom: 15px;
}

.movie-card img{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.movie-description{
    padding-top: 25px;
    text-align: left;
}

.movie-description > *{
    margin-bottom: 20px;
}
</style>
