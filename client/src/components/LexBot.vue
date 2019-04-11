
<template>
    <div>
         <div class="audio-control" v-bind:class="{ hide: showElement }">
            <p id="audio-control" class="white-circle" v-on:click="startBot()">
                <img id="mpicon" src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/98-512.png" width="105px">
                
            </p>
            <canvas class="visualizer"></canvas>
            <p><span  id="message">{{message}}</span></p>
            
            <button v-on:click="showModal()" id="hideBtn">Hide Modal</button>
        
            <p>
            
            </p>
            
        </div>
    </div>
</template>

<script>
//<div style="background-color:firebrick;height: 500px;"></div>

import $ from 'jquery'
import { EventBus } from '@/services/Bus.js';

export default {
  name: 'LexBot',
  props: ['showElement'],
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
       
        var config, conversation;
        this.message= 'Passive';
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:336aedf2-8cee-4854-9a1e-92c824ff42f5',
        });
      
        config = {
            lexConfig: { botName: 'MovieReview' }
        };
        conversation = new LexAudio.conversation(config, function (state) {
            this.message = state + '...';
            if (state === 'Listening') {
                waveform.prepCanvas();
            }
            if (state === 'Sending') {
                waveform.clearCanvas();
            }
        }.bind(this), function (data) {
            
            if(data.slots.MovieName != null){
                this.navToSearch(data.slots.MovieName);
                this.$emit('update:showElement', true)
                console.log('Transcript: ', data.inputTranscript, ", Response: ", data.message);
            }
            
            //searchword
        }.bind(this), function (error) {
            this.message = error;
        }.bind(this), function (timeDomain, bufferLength) {
            waveform.visualizeAudioBuffer(timeDomain, bufferLength);
        });
        conversation.advanceConversation();
        
    },
    navToSearch(data){
        console.log();
        if(this.$route.path == '/search'){
            console.log('here');
            this.$router.push({ query: { query: data }});
            EventBus.$emit('updateSearch', data);
        }else{
            this.$router.push({path:'search', query: { query: data }});
        }
    },
    showModal(){
        if(this.showElement){
            this.$emit('update:showElement', false)
        }else{
            this.$emit('update:showElement',true)
        }
        
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
    margin-top: 50px;
}

#message{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 120%);
    color: white;
}

.visualizer{
    position: fixed;
    top: 50%;
    left: 0%;
    transform: translate(0%,-40%);
    
}
#audio-control{
    margin-bottom: 12px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-90%);
}
.audio-control{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: .9;
    z-index: 100;
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

</style>
