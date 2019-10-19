import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/styles/index.scss'; 
import '@/stylesSe/index.scss'; 
import BaiduMap from 'vue-baidu-map';
import qs from 'qs'
import Axios from 'axios'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ydPscWsaF9oqc1DOYtPgmCTmAUdqG4Cq'
})

Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// Axios.defaults.baseURL = 'http://192.168.8.109:8877/'
Axios.defaults.baseURL = 'http://47.110.160.217:9071/'

Vue.prototype.$http = Axios
Vue.prototype.$qs = qs

// 拦截器
Axios.interceptors.response.use(function (res) {
  return res.data
})

Vue.use(ElementUI, { size: "small", zIndex: 3000 });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
