import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'


Vue.use( CKEditor );
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

window.axios=axios
// axios.defaults.baseURL = 'http://159.89.55.3';
 axios.defaults.baseURL = 'http://localhost:8000';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
