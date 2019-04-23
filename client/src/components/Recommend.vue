
<template>
    <div>
         <div class="recommend-panel" v-bind:class="{ hide: showElement }">
            <div class="recommend-bkg"></div>
            <div class="recommend-content col-sm-3">
                <h1>Recommend Movie:</h1>
                <h3>Send movie recommendation to...</h3>
                <div class="friends-list">
                    <div class="friend-item" v-on:click="recommendMovie(0)">
                        <img width="35" height="35" class="friendIcon" src="https://cdn0.iconfinder.com/data/icons/3-colors-outline/500/Notes-512.png" alt="userIcon" title="userIcon"> 
                        <p>My Recommendation List</p>
                    </div>
                    <div class="friend-item" v-on:click="recommendMovie(1)">
                        <img width="35" height="35" class="friendIcon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNngF0RFPjyGl4ybo78-XYxxeap88Nvsyj1_txm6L4eheH8ZBu" alt="userIcon" title="userIcon"> 
                        <p>DeAndre Holmes</p>
                    </div>
                    <div class="friend-item" v-on:click="recommendMovie(2)">
                        <img width="35" height="35" class="friendIcon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNngF0RFPjyGl4ybo78-XYxxeap88Nvsyj1_txm6L4eheH8ZBu" alt="userIcon" title="userIcon"> 
                        <p>Valerie Ray</p>
                    </div>
                    <div class="friend-item" v-on:click="recommendMovie(3)">
                        <img width="35" height="35" class="friendIcon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNngF0RFPjyGl4ybo78-XYxxeap88Nvsyj1_txm6L4eheH8ZBu" alt="userIcon" title="userIcon"> 
                        <p>Nabeel Ali</p>
                    </div>
                    
                </div>
            </div>
            <button v-on:click="showModal()" id="hideBtn">Hide Modal</button>
        </div>
    </div>
</template>

<script>
//<div style="background-color:firebrick;height: 500px;"></div>

import $ from 'jquery'
import { EventBus } from '@/services/Bus.js';
import movies from '@/services/RecMoviesList.js';

export default {
  name: 'LexBot',
  props: ['showElement', 'movieId'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: '',
      modalIsVisible: this.showElement
    }
  },
  mounted () {

  },
  methods: {
    startBot(){
        
    },
    showModal(){
        if(this.showElement){
            this.$emit('update:showElement', false)
        }else{
            this.$emit('update:showElement',true)
        }
    },
    recommendMovie(id){
        movies[this.movieId] = this.movieId;
        //console.log(movies);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#mpicon{
    margin-top: -13px;
    width: 90px;
}

.hide{
    display: none;
}

#hideBtn{
    position: fixed;
    top: 70px;
    left: 50%;   
    transform: translate(-50%, 120%); 
}

#message{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 120%);
    color: white;
}

.recommend-content{
    min-width: 400px;
    height: 500px;
    background-color: white;
    margin-bottom: 12px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.recommend-content h1{
    margin-top: 55px;
    font-size: 33px;
    font-weight: 600;
}

.recommend-content h3{
    margin-top: 10px;
    font-size: 20px;
}

.recommend-panel{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
}

.recommend-bkg{
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: .85;
    z-index: 0;
}

textarea, select, input, button { outline: none; }


    .white-circle {
        cursor: pointer;
        background-color: #fff;
        box-shadow: 0 0 8px #d8dbe3;
        border-radius: 100px;
        height: 100px;
        margin: 0 auto;
        width: 100px;
    }
    
    .white-circle:hover {
        box-shadow: 0 0 8px #007dbc;
    }
    
    .white-circle img {
        position: relative;
        top: 18px;
    }
   
    body {
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        line-height: 21px;
        color: #444;
        font-size: 13px;
        font-weight: 400;
        background-color: #f9fafc;
    }
    
    canvas {
        height: 100px;
        width: 100vw;
        margin-top: -50px;
        display: block;
        position: fixed;
        top: 50%;
        left: 0;
        z-index: -1;
    }

    .friend-item{
        width: 100%;
        margin: auto;
        height: 65px;
        padding: 10px 10%;
        border-bottom: 1px solid rgb(233, 230, 230);
    }
  .friend-item:hover{
      cursor: pointer;
      background-color: rgb(233, 230, 230);
  }
    .friend-item *{
        float: left;
    }

    .friend-item img{
        border-radius: 150px;
        margin-top: 4px;
    }

    .friend-item p{
        padding-top: 9px;
        margin-left: 12px;
        font-weight: 600;
    }

    .friends-list{
        max-width: 300px;
        margin: auto;
        margin-top: 30px;
    }

</style>
