<template>
  <div class="profile-page">
      <div class="backdrop" style="">
          <div class="profile-header col-sm-10">
            <div class="col-sm-3" style="min-width: 350px"></div>
            <div class="profile-header-offset col-sm-7">

                <h1>Sam Hunt</h1>
                <p>
                    <span> 
                        Semi-Legit Movie Reviewer
                    </span>
                </p>
  
            </div>
        </div>
      </div>

      

        
    <div class="col-sm-10 profile-content">
        <div class="col-sm-3 profile-card">
            <img src="https://d1yn1kh78jj1rr.cloudfront.net/image/thumbnail/rDtN98Qoishumwih/graphicstock-handsome-big-moustache-hipster-man-smoking-pipe-in-the-city_H6lAkh_5Jb_thumb.jpg" width="100%"/>
            <h3>ABOUT</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </p>
            <p>
                <b>Favorite Movie: </b> City of God 
            </p>
            <p>
                 <b>Country:</b> USA
            </p>
            <p>
                <b>Language:</b> English
            </p>
        </div>
        <div class="col-sm-7 movie-rec">
            <h3>My Recommendations List</h3>
            <div v-if="isLoaded">
                <div class="rec-movie-item" v-for="(movie, index) in movies" :key="index" v-on:click="goToMovieDetails(movie)">
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
            
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import apiKey from '@/services/ApiKey.js'
import moviesList from '@/services/RecMoviesList.js';

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

export default {
  name: 'profile',
  data () {
    return {
        isLoaded: false,
        movies:[]
    }
  },
  mounted () {
    console.log(moviesList);
    this.showMovieRecommendations();
  },
  methods: {
    showMovieRecommendations(){
        var size = Object.size(moviesList);
        console.log(size);
        if(size != 0){
            for(let item in moviesList){         
                $.ajax({
                url: 'https://api.themoviedb.org/3/movie/' + item + '?language=en-US&page=1&api_key=' + apiKey,
                method: 'GET',
                async: true,
                success: function (data) {
                    this.movies.push(data);
                    if(Object.size(this.movies)== size){
                        this.isLoaded = true;
                    }
                }.bind(this),
                error: function (error) {
                    console.log(error);
                }
                });
            }
        }

    },
    goToMovieDetails(data){
      this.$router.push({path:'movie-details', query: { id: data.id }});
    }
  }
}
</script>

<style scoped>

b{
    font-weight: 600;
}

.backdrop{
    width: 100%;
    padding-top: 250px;
    height: 430px;
    position: sticky;
    background-color: black;
    background-image:linear-gradient(to bottom, rgba(161, 47, 195, 0.4), rgba(255,0,0,0.5)), url('https://www.gamecrate.com/sites/default/files/wp-content/uploads/2015/03/youtube_cover.png');
    background-repeat:repeat;
    background-position: 50% 50%;
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
    background-image: -webkit-linear-gradient(to bottom,rgba(156, 53, 53, 0) 0%,#000000 95%);
    background-image: -moz-linear-gradient(to bottom,rgba(161, 65, 65, 0) 0%,#000000 95%);
    background-image: -o-linear-gradient(to bottom,rgba(190, 52, 52, 0) 0%,#000000 95%);
    background-image: -ms-linear-gradient(to bottom,rgba(161, 53, 53, 0) 0%,#000000 95%);
    background-image: linear-gradient(to bottom,rgba(165, 54, 54, 0) 0%,#000000 95%);
    opacity: .8;
}


.profile-header{
    height: 250px;
    margin: auto;
    padding: 0px;
}

.profile-header > *{
    height: 250px;
    display: inline-block;
    vertical-align: top;
    text-align: left;
    color: white;
}

.profile-header-offset{
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


.profile-content{
    margin: auto;
    padding: 0;
    height: 100vh;
}

.profile-content > *{
    vertical-align: top;
    display: inline-block;
}


.profile-card{
    margin-top: -250px; 
    text-align: left;
    min-width: 300px;
    max-width: 350px;
}

.profile-card h3{
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: 600;
}

.profile-card > *{
    margin-bottom: 25px;
}

.profile-card p{
    margin-bottom: 15px;
}

.profile-card img{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.movie-rec{
    padding-top: 25px;
    text-align: left;
    margin-left: 25px;
}

.movie-rec > *{
    margin-bottom: 20px;
}


.rec-movie-item{
  min-height: 100px;
  vertical-align: top;
  display: inline-block;
  margin: 15px;
  position:sticky;
}

.rec-movie-item:hover{
    cursor: pointer;
}

.img-holder{
  max-width: 300px;
  overflow: hidden;
  z-index: 50;
  position: sticky;
  margin: auto;
  height: 200px;
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

.rec-movie-item img{
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

.rec-movie-item p{
  box-sizing: border-box;
  margin: auto;
  width: 70%;
  text-align: center;
}


.popMovieInfo{
  color: white;
  text-align: center;
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
