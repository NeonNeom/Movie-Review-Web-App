!function r(a,s,c){function u(n,e){if(!s[n]){if(!a[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(f)return f(n,!0);var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}var i=s[n]={exports:{}};a[n][0].call(i.exports,function(e){var t=a[n][1][e];return u(t||e)},i,i.exports,r,a,s,c)}return s[n].exports}for(var f="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(e,t,c){!function(){"use strict";var o,i,r,a,n=e("./recorder.js"),s="Audio is not supported.";c.audioControl=function(e){e=e||{},this.checkAudioSupport=!1!==e.checkAudioSupport;var t=function(t){t=t||function(){},navigator.mediaDevices&&navigator.mediaDevices.getUserMedia?(i=n.audioRecorder()).requestDevice().then(function(e){t(r=!0)}).catch(function(e){t(r=!1)}):t(r=!1)};return this.checkAudioSupport&&t(),{startRecording:function(e,t,n){if(e=e||function(){},t=t||function(){},!(r=!1!==r))throw new Error(s);(o=i.createRecorder(n)).record(e,t)},stopRecording:function(){if(!(r=!1!==r))throw new Error(s);o.stop()},exportWAV:function(e,t){if(!(r=!1!==r))throw new Error(s);if(!e||"function"!=typeof e)throw new Error("You must pass a callback function to export.");t=void 0!==t?t:16e3,o.exportWAV(e,t),o.clear()},play:function(e,t){if(void 0!==e){var n=new Blob([e]),o=new FileReader;o.onload=function(){a=i.audioContext().createBufferSource(),i.audioContext().decodeAudioData(this.result,function(e){a.buffer=e,a.connect(i.audioContext().destination),a.onended=function(e){"function"==typeof t&&t()},a.start(0)})},o.readAsArrayBuffer(n)}},stop:function(){void 0!==a&&a.stop()},clear:function(){o.clear()},playHtmlAudioElement:function(e,t){if(void 0!==e){var n=new Blob([e]),o=document.createElement("audio"),i=window.URL.createObjectURL(n);o.src=i,o.addEventListener("ended",function(){o.currentTime=0,"function"==typeof t&&t()}),o.play()}},supportsAudio:t}}}()},{"./recorder.js":5}],2:[function(i,e,r){!function(){"use strict";var a,e=i("./control.js").audioControl,s=Object.freeze({PASSIVE:"Passive",LISTENING:"Listening",SENDING:"Sending",SPEAKING:"Speaking"}),c=new e({checkAudioSupport:!1});r.conversation=function(e,n,t,o,i){var r;if(this.config=f(e),this.lexConfig=this.config.lexConfig,this.messages=s,n=n||function(){},this.onSuccess=t||function(){},this.onError=o||function(){},this.onAudioData=i||function(){},this.config.lexConfig.botName)if(AWS.config.credentials){if(AWS.config.region)return a=new AWS.LexRuntime,this.onSilence=function(){e.silenceDetection&&(c.stopRecording(),r.advanceConversation())},this.transition=function(e){var t=(r=e).state;n(t.message),t.message!==t.messages.SENDING&&t.message!==t.messages.SPEAKING||r.advanceConversation(),t.message!==t.messages.SENDING||this.config.silenceDetection||c.stopRecording()},this.advanceConversation=function(){c.supportsAudio(function(e){e?r.advanceConversation():o("Audio is not supported.")})},this.updateConfig=function(e){this.config=f(e),this.lexConfig=this.config.lexConfig},this.reset=function(){c.clear(),r=new u(r.state)},r=new u(this),{advanceConversation:this.advanceConversation,updateConfig:this.updateConfig,reset:this.reset};this.onError("A Region value must be provided.")}else this.onError("AWS Credentials must be provided.");else this.onError("A Bot name must be provided.")};var u=function(e){(this.state=e).message=e.messages.PASSIVE,this.advanceConversation=function(){c.startRecording(e.onSilence,e.onAudioData,e.config.silenceDetectionConfig),e.transition(new t(e))}},t=function(t){(this.state=t).message=t.messages.LISTENING,this.advanceConversation=function(){c.exportWAV(function(e){t.audioInput=e,t.transition(new n(t))})}},n=function(n){(this.state=n).message=n.messages.SENDING,this.advanceConversation=function(){n.lexConfig.inputStream=n.audioInput,a.postContent(n.lexConfig,function(e,t){e?(n.onError(e),n.transition(new u(n))):(n.audioOutput=t,n.transition(new o(n)),n.onSuccess(t))})}},o=function(e){(this.state=e).message=e.messages.SPEAKING,this.advanceConversation=function(){"audio/mpeg"===e.audioOutput.contentType?c.play(e.audioOutput.audioStream,function(){"ReadyForFulfillment"!==e.audioOutput.dialogState&&"Fulfilled"!==e.audioOutput.dialogState&&"Failed"!==e.audioOutput.dialogState&&e.config.silenceDetection?(c.startRecording(e.onSilence,e.onAudioData,e.config.silenceDetectionConfig),e.transition(new t(e))):e.transition(new u(e))}):e.transition(new u(e))}},f=function(e){(e=e||{}).silenceDetection=!e.hasOwnProperty("silenceDetection")||e.silenceDetection;var t=e.lexConfig||{};return t.botAlias=t.hasOwnProperty("botAlias")?t.botAlias:"$LATEST",t.botName=t.hasOwnProperty("botName")?t.botName:"",t.contentType=t.hasOwnProperty("contentType")?t.contentType:"audio/x-l16; sample-rate=16000",t.userId=t.hasOwnProperty("userId")?t.userId:"userId",t.accept=t.hasOwnProperty("accept")?t.accept:"audio/mpeg",e.lexConfig=t,e}}()},{"./control.js":1}],3:[function(t,n,e){(function(e){e.LexAudio=e.LexAudio||{},e.LexAudio.audioControl=t("./control.js").audioControl,e.LexAudio.conversation=t("./conversation.js").conversation,n.exports=e.LexAudio}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./control.js":1,"./conversation.js":2}],4:[function(e,t,n){var m=arguments[3],w=arguments[4],A=arguments[5],x=JSON.stringify;t.exports=function(e,t){for(var n,o=Object.keys(A),i=0,r=o.length;i<r;i++){var a=o[i],s=A[a].exports;if(s===e||s&&s.default===e){n=a;break}}if(!n){n=Math.floor(Math.pow(16,8)*Math.random()).toString(16);var c={};for(i=0,r=o.length;i<r;i++){c[a=o[i]]=a}w[n]=[Function(["require","module","exports"],"("+e+")(self)"),c]}var u=Math.floor(Math.pow(16,8)*Math.random()).toString(16),f={};f[n]=n,w[u]=[Function(["require"],"var f = require("+x(n)+");(f.default ? f.default : f)(self);"),f];var d={};!function e(t){d[t]=!0;for(var n in w[t][1]){var o=w[t][1][n];d[o]||e(o)}}(u);var l="("+m+")({"+Object.keys(d).map(function(e){return x(e)+":["+w[e][0]+","+x(w[e][1])+"]"}).join(",")+"},{},["+x(u)+"])",p=window.URL||window.webkitURL||window.mozURL||window.msURL,g=new Blob([l],{type:"text/javascript"});if(t&&t.bare)return g;var v=p.createObjectURL(g),h=new Worker(v);return h.objectURL=v,h}},{}],5:[function(e,t,i){!function(){"use strict";var t,n,r=e("webworkify")(e("./worker.js")),o=function(e,a){(a=a||{}).time=a.hasOwnProperty("time")?a.time:1500,a.amplitude=a.hasOwnProperty("amplitude")?a.amplitude:.2;var n,s,c,u,o=!1,t=e.context.createScriptProcessor(4096,1,1);r.onmessage=function(e){var t=e.data;n(t)},r.postMessage({command:"init",config:{sampleRate:e.context.sampleRate}});var i=function(){o=!1};t.onaudioprocess=function(e){o&&(r.postMessage({command:"record",buffer:[e.inputBuffer.getChannelData(0)]}),function(){f.fftSize=2048;var e=f.fftSize,t=new Uint8Array(e),n=a.amplitude,o=a.time;f.getByteTimeDomainData(t),"function"==typeof u&&u(t,e);for(var i=0;i<e;i++){var r=t[i]/128-1;(n<r||r<-1*n)&&(s=Date.now())}o<Date.now()-s&&c()}())};var f=e.context.createAnalyser();return f.minDecibels=-90,f.maxDecibels=-10,f.smoothingTimeConstant=.85,e.connect(f),f.connect(t),t.connect(e.context.destination),{record:function(e,t){c=e,u=t,s=Date.now(),o=!0},stop:i,clear:function(){i(),r.postMessage({command:"clear"})},exportWAV:function(e,t){n=e,r.postMessage({command:"export",sampleRate:t})}}};i.audioRecorder=function(){return{requestDevice:function(){return void 0===t&&(window.AudioContext=window.AudioContext||window.webkitAudioContext,t=new AudioContext),navigator.mediaDevices.getUserMedia({audio:!0}).then(function(e){n=e})},createRecorder:function(e){return o(t.createMediaStreamSource(n),e)},audioContext:function(){return t}}}}()},{"./worker.js":6,webworkify:4}],6:[function(e,t,n){t.exports=function(e){"use strict";var d,c=0,u=[];function f(e,t,n){for(var o=0;o<n.length;o++)e.setUint8(t+o,n.charCodeAt(o))}e.addEventListener("message",function(e){switch(e.data.command){case"init":s=e.data.config,d=s.sampleRate;break;case"record":a=e.data.buffer,u.push(a[0]),c+=a[0].length;break;case"export":t=e.data.sampleRate,o=function(e,t){if(t===d)return e;var n=d/t,o=Math.round(e.length/n),i=new Float32Array(o),r=0,a=0;for(;r<i.length;){for(var s=Math.round((r+1)*n),c=0,u=0,f=a;f<s&&f<e.length;f++)c+=e[f],u++;i[r]=c/u,r++,a=s}return i}(function(e,t){for(var n=new Float32Array(t),o=0,i=0;i<e.length;i++)n.set(e[i],o),o+=e[i].length;return n}(u,c),t),i=new ArrayBuffer(44+2*o.length),f(r=new DataView(i),0,"RIFF"),r.setUint32(4,32+2*o.length,!0),f(r,8,"WAVE"),f(r,12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,1,!0),r.setUint16(22,1,!0),r.setUint32(24,d,!0),r.setUint32(28,2*d,!0),r.setUint16(32,2,!0),r.setUint16(34,16,!0),f(r,36,"data"),r.setUint32(40,2*o.length,!0),function(e,t,n){for(var o=0;o<n.length;o++,t+=2){var i=Math.max(-1,Math.min(1,n[o]));e.setInt16(t,i<0?32768*i:32767*i,!0)}}(r,44,o),n=new Blob([r],{type:"application/octet-stream"}),postMessage(n);break;case"clear":c=0,u=[]}var t,n,o,i,r,a,s})}},{}]},{},[3]);

(function() {
  'use strict';
  var canvas = document.querySelector('.visualizer');
  var canvasCtx = canvas.getContext('2d');
  var listening = true;

  /**
   * Will render an audio buffer as wave form. Right now, it expects 
   * a canvas element to be on the page with class name "visualizer".
   */
  window.Waveform = function() {
    /**
     * Clears the canvas element.
     */
    var clearCanvas = function() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      listening = false;
    };

    /**
     * Sets the listening flag to true.
     */
    var prepCanvas = function() {
      listening = true;
    };

    /**
     * Clears the canvas and draws the dataArray. 
     * @param {Uint8Array} dataArray - The time domain audio data to visualize.
     * @param {number} bufferLength - The FFT length.
     */
    var visualizeAudioBuffer = function(dataArray, bufferLength) {
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
      var animationId;
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      /**
       * Will be called at about 60 times per second. If listening, draw the dataArray. 
       */
      function draw() {
        if (!listening) {
          return;
        }

        canvasCtx.fillStyle = 'rgba(9,250,252,0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 3;
        canvasCtx.strokeStyle = 'rgb(100,125,188)';
        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
          var v = dataArray[i] / 128.0;
          var y = v * HEIGHT / 2;
          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      }

      // Register our draw function with requestAnimationFrame. 
      if (typeof animationId === 'undefined') {
        animationId = requestAnimationFrame(draw);
      }
    };
    return {
      clearCanvas: clearCanvas,
      prepCanvas: prepCanvas,
      visualizeAudioBuffer: visualizeAudioBuffer
    };
  };
})();

 var waveform = window.Waveform();
    
    
