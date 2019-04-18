
<template>
  <div v-if="isLoaded">
    <div class="window" ref="scrollContent" v-on:mousedown="startDrag($event)" v-on:mousemove="doDrag($event)">
      <div class="carousel">
        <span class="slide " :style="'width: calc(100vw/'+ slideWidth +')'" v-for="(popularMovie, index) in popularMovies" :key="`popMovie-${index}`">
          <div class="img-holder" :style="'max-width: calc(100vw/'+ slideWidth +')'">
            <img :src="'https://image.tmdb.org/t/p/w300' + popularMovie.poster_path" width="300px" :style="'max-width: calc(100vw/'+ slideWidth +')'"/>
      
            <div class="popMovieInfo">
              <div class="movie-rating">
                <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/star-icon.png" width="15px" height="15px"/>
                {{ popularMovie.vote_average }}</div>
              <p class="movie-title"><b>{{ popularMovie.title }}</b></p>
              <span>{{ popularMovie.release_date }}</span>  
            </div> 
          
          </div>
          
        </span>
      </div>
    </div>

    <div class=" col-sm-9 MainContent">
      <div class="mainContentTitle">
        <img src="https://png.pngtree.com/svg/20170614/c40c30fe9c.svg" width="22px" height="22px" />
        <h3>Recent Movie Reviews</h3>
        <hr/>
      </div>
      

    </div>

  </div>
</template>

<script>
//<div style="background-color:firebrick;height: 500px;"></div>

import $a from 'jquery'
import apiKey from '@/services/ApiKey.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isLoaded: false,
      popularMovies: [],
      dragging: false,
      x: 'no',
      scrollChange: 0,
      scrollHeight: 0,
      viewSize: 0,
      slideWidth: 4
    }
  },
  mounted () {
    this.viewportSize();
    this.getPopularMovies();
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('resize', this.viewportSize);
  },
  methods: {
    getPopularMovies () {
      $a.ajax({
          url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&release_date=2019&api_key=' + apiKey,
          method: 'GET',
          async: true,
          success: function (data) {
            for(var movieData in data.results){
              this.popularMovies.push(data.results[movieData]);
            }
            this.isLoaded = true;
          }.bind(this),
          error: function (error) {
              console.log(error);
          }
      });
    },
    startDrag(event){
      this.dragging = true;
      this.x = 'no';
      this.scrollChange = event.clientX;
      this.scrollHeight = this.$refs.scrollContent.scrollLeft;
    },
    stopDrag() {
      var slideWidth = $(window).width()/this.slideWidth;
      if(this.dragging == true && this.$refs.scrollContent.scrollLeft % slideWidth != 0){
        var scrollDist = this.$refs.scrollContent.scrollLeft/slideWidth;
        if(this.x < 0){
          var newScrollPos = (Math.floor(scrollDist)) * slideWidth;
          $('.window').animate({
            scrollLeft: newScrollPos
          },450, "easeOutQuint");
          //this.$refs.scrollContent.scrollLeft = newScrollPos;
        }else{
          var newScrollPos = (Math.ceil(scrollDist)) * slideWidth;
          $('.window').animate({
            scrollLeft: newScrollPos
          }, 450, "easeOutQuint");
          //this.$refs.scrollContent.scrollLeft = newScrollPos;
        }
        
       // console.log(this.$refs.scrollContent.scrollLeft/300);
      }
      this.dragging = false;
      this.x = 'no';
    },
    doDrag(event) {
      if (this.dragging) {
        this.x = this.scrollChange - event.clientX ;
        this.$refs.scrollContent.scrollLeft = this.scrollHeight + this.x;
        //console.log(this.x);
      }
    },
    viewportSize(){
      this.viewSize = $(window).width();
      if($(window).width() > 1800){
        this.slideWidth = 7;
      }else if($(window).width() > 1500){
        this.slideWidth = 6;
      }else if($(window).width() > 1200){
        this.slideWidth = 5;
      }else if($(window).width() > 900){
        this.slideWidth = 4;
      }else if($(window).width() > 600){
        this.slideWidth = 3;
      }else if($(window).width() > 300){
        this.slideWidth = 2;
      }else if($(window).width() > 0){
        this.slideWidth = 1;
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.MainContent{
 margin: auto;
 margin-top: 45px;
}

.mainContentTitle{
  width: 100%;
}
.mainContentTitle *{
  margin: 5px;
  vertical-align: top;
  float: left;
}


.mainContentTitle img{
  margin-top: 8px;
}

.mainContentTitle hr{
  width: 100%;
}
.MainContent h3{
  font-weight: 100;
  font-size: 25px;
  color: rgb(71, 71, 71);
  text-align:left;
  display: inline-block;
}

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
  overflow-y:hidden;
  overflow-x: hidden;
  position: relative;
  background-color: black;

}

.movie-rating img{
  margin-top: -4px;
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

.carousel {
  width:max-content;
  position: relative;
  height: auto;
  background-color: black;
  top: 0; left: 0px;
  
}
.slide {
  height: max-content;
  vertical-align: bottom;
  
  cursor: url(../assets/cursor.png),auto;
  float: left;
  display: flex;
  background-color: black;
  flex-direction: column;
  justify-content: center;
}


.img-holder{
  overflow: hidden;
  z-index: 50;
  position: sticky;
  margin: auto;
   -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
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
    background-image: linear-gradient(rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 1) 100%);
}

.slide img{
  -webkit-transition: 0.4s ease;
  transition: 0.4s ease;
}

.img-holder:hover::before{
  opacity: 1;
}

.img-holder:hover > img{
  -webkit-transform: scale(1.18);
  transform: scale(1.18);
}



</style>
