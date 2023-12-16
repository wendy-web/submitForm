import Vue from 'vue'
import App from './App.vue'
import store from './store';
import './assets/css/reset.scss';

// import { Button } from 'vant';

// import Vue from 'vue';
// import Vant from 'vant';
// import 'vant/lib/index.css'
// Vue.use(Vant);

// import { Toast } from 'vant';
// Vue.use(Toast);
// Toast('提示内容');
import { Popup } from 'vant';
Vue.use(Popup);
Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
