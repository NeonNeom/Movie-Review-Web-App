
<template>
  <nav>
          <LexBotSearch :showElement.sync="modalIsVisible"></LexBotSearch>
          <div id="mySidenav" class="sidenav" :style="{ width: navMenuWidth}">
              <a href="javascript:void(0)" class="closebtn"  v-on:click="hideNavMenu()">&times;</a>
              <nav>
                    <router-link to="/">Home</router-link>
                    <router-link to="/posts">Posts</router-link>
                    <router-link to="/search">Search</router-link>
                </nav>
            </div>
        <div class="container">
            <div class="col-sm-3 logo-container">
                <div id="menu-icon" v-on:click="showNavMenu()">
                    <div id="line1" class="menu-line"></div>
                    <div id="line2" class="menu-line"></div>
                    <div id="line3" class="menu-line"></div>
                </div>

                <img class="enter-logo img-responsive" src="http://demo.themeum.com/wordpress/moview/wp-content/themes/moview/images/logo.png" alt="Logo" title="Logo">  
            </div>
            <div class="col-sm-6 home-search ">
            
                <div id="moview_search" class="moview-search moview_search">
                    <form id="moview-search" action="/search">
                    
                        <div class="search-panel">
                            <div class="select-menu">
                                <select name="searchtype" id="searchtype" class="selectpicker">
                                    <option value="movie"> Movies</option>
                                    <option value="users">Users</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="input-box">
                            
                            <input v-model="searchData" type="text" id="searchword" name="query" class="moview-search-input form-control" value="" placeholder="" autocomplete="off" >
                            
                        </div>

                        <span class="lex-icon"  v-on:click="showModal()">
                            <img width="17" height="17" class="lexBot-icon img-responsive" src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/microphone-icon.png" alt="lexBot" title="lexBot"> 
                        </span>
                        
                        <span class="search-icon">
                            
                        
                            <img v-on:click="navToSearch()" width="20" height="20" class="src-icon img-responsive" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png" alt="src" title="search"> 
                        
                        </span>
                    
                    </form>
                </div>
            
            </div>
            
            <div class="col-sm-2 signin">
                <div class="profile-icon"></div>
            
                <p>Login</p>
            </div>
        </div>
      
          
      </nav>
</template>

<script>
/* eslint-disable */
import { EventBus } from '@/services/Bus.js';
import LexBotSearch from '@/components/LexBot.vue';

export default {
  name: 'navigationbar',
  data () {
    return {
      navMenuWidth: '0px',
      searchData: '',
      modalIsVisible : true
    }
  },
  components:{
      LexBotSearch
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      console.log("Test");
    },
    showNavMenu(){
        if(this.navMenuWidth == '0px'){
            this.navMenuWidth = '400px';
        }else{
            this.navMenuWidth = '0px'
        }
    },
    hideNavMenu(){
        this.navMenuWidth = '0px';
    },
    navToSearch(){
        console.log();
        if(this.$route.path == '/search'){
            console.log('here');
            this.$router.push({ query: { query: this.searchData }});
            EventBus.$emit('updateSearch', this.searchData);
        }else{
            this.$router.push({path:'search', query: { query: this.searchData }});
        }
    },
    showModal(){
        if(this.modalIsVisible){
            this.modalIsVisible = false;
        }else{
            this.modalIsVisible = true;
        }
    }
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      this.hideNavMenu();
    }
  }
}
</script>

<style scoped>

.container{
    box-sizing: border-box;
    min-height: 70px;
    background-color: white;
}

.container > *, #menu-icon{
    vertical-align: top;
    height: 70px;
    display: inline-block
}
nav{
    box-sizing: border-box;
    min-height: 70px;
}

.lex-icon{
    position: absolute;
    margin-top:11px; 
    right: 45px;
}

.lex-icon:hover{
    cursor: pointer;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#menu-icon{
    margin: 24px 18px;
    padding: 2px;
    height: 23px;
}
#menu-icon:hover{
    cursor: pointer;
}

.menu-line{
    background-color: black;
    width: 30px;
    margin-bottom: 4px;
    height: 4px;
}

.enter-logo{
    padding: 22px 0px;
    height: 67px;
}

.home-search {
    margin: 0px;
    height: 70px;
    
}

#moview_search{
    margin-top: 14px;
    border: 1px solid #e3e3e3;
    border-radius: 30px;
    width: 100%;
    position: relative;
    height: 40px;
    padding: 0px 15px;
}

#moview-search *{
    float: left;
}

.search-panel{
    width: 100px;
    height: 40px;
    padding-left: 5px;
    border-right: 1px solid #e3e3e3;
}

#searchtype{
    outline: none;
    border: none;
}
.search-panel .select-menu select {
    width: 100px;
    min-height: 37px!important;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: none;
    padding: 0;
    border-radius: 0;
    font-weight: 400;
    display: inline-block;
    font-size: 14px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    color: #727272;
    background: transparent;
    position: relative;
    z-index: 11;
}


.search-panel .select-menu::after {
    content: 'v';
    font-size: 10px;
    color: #aaa9a9;
    line-height: 7px;
    position: absolute;
    left: 95px;
    top: 50%;
    margin-top: -4px;
    z-index: 10;
    -webkit-transform:scale(2,1); /* Safari and Chrome */
    -moz-transform:scale(2,1); /* Firefox */
    -ms-transform:scale(2,1); /* IE 9 */
    -o-transform:scale(2,1); /* Opera */
    transform:scale(2,1); /* W3C */
}


.home-search .input-box input{
    margin: 0px;
    outline: none;
    border: none;
    box-shadow: none;
    padding-right: 0px;
    width: calc(100% - 160px);
    position: absolute;
    top: 0;
}

.src-icon{
    position: absolute;
    right: 15px;
    top: 9px;
}

.src-icon:hover{
    cursor: pointer;
}

.signin p{
    width: 90px;
    height: 60px;
    padding: 20px;
    float: right;
    box-sizing: border-box;
}

.profile-icon{
    background: url('../assets/profile-icon.png');
    
     background-size: cover; 
     background-position: center;
    width: 22px;
    height: 22px;
    display: inline-block;
    position: absolute;
    right: 88px;
    top: 20.5px;
}

.signin img{
    width: 25px;
    height: 25px;
    position: absolute;
    left: 5px;
    top: 18px;
    color: firebrick;
}

.signin *:hover{
    cursor: pointer;
}

.logo-container{
    min-width: 220px; 
    margin-right: 15px;
}


</style>
