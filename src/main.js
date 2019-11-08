import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/styles/index.scss';
import '@/stylesSe/index.scss';
import BaiduMap from 'vue-baidu-map';
import qs from 'qs';
import Axios from 'axios';
import Echarts from 'echarts';
// 字体图标样式
import './assets/font/iconfont.css';
// 引入vue-video-player
import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
import hls from 'videojs-contrib-hls';

Vue.prototype.$Echarts = Echarts;

Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// Axios.defaults.baseURL = 'http://192.168.124.6:8888/' // 路路
Axios.defaults.baseURL = 'http://192.168.8.126:8080/' // 升龙
// Axios.defaults.baseURL = 'http://118.31.245.183:10500/'

Vue.prototype.$http = Axios
Vue.prototype.$qs = qs

// 拦截器
Axios.interceptors.response.use(function (res) {
  return res.data
});

Vue.use(hls);
Vue.use(VideoPlayer);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ydPscWsaF9oqc1DOYtPgmCTmAUdqG4Cq'
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
