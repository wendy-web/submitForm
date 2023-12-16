import Vue from 'vue'
import App from './App.vue'
import store from './store';
import './assets/css/reset.scss';
import './assets/js/rem'


import { Popup } from 'vant';
Vue.use(Popup);
import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios); //注意需要先注册VueAxios
// Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
