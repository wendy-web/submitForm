import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.scss';
import './assets/js/rem'


// import { Popup } from 'vant';
// Vue.use(Popup);
import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios); //注意需要先注册VueAxios
// Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// main.js进行全局引入
import Vant from 'vant'
import 'vant/lib/index.css';
Vue.use(Vant)
new Vue({
    render: h => h(App)
}).$mount('#app')
