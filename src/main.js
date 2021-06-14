import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
Vue.config.productionTip = false
import axios from 'axios'
// 视频hls插件引入
const hls = require('videojs-contrib-hls')
Vue.use(hls)

// 视频播放插件引入
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)


// import Ionic from '@ionic/vue';
// import '@ionic/core/css/ionic.bundle.css';
// Vue.use(Ionic);


Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



