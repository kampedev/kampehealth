import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import { BreadstickBakery } from 'breadstick'
import VueFilterDateFormat from 'vue-filter-date-format';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import VueInitialsImg from 'vue-initials-img';
import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';
import Toasted from 'vue-toasted';
import Vuelidate from 'vuelidate'
import VueHtml2Canvas from 'vue-html2canvas';
import VueApexCharts from 'vue-apexcharts'
import Clipboard from 'v-clipboard'
import VueSignaturePad from 'vue-signature-pad';
import JsonExcel from "vue-json-excel";
import HighchartsVue from 'highcharts-vue'


Vue.use( CKEditor );
Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(BreadstickBakery)
Vue.use(VueFilterDateFormat);
Vue.use(vueNumeralFilterInstaller);
Vue.use(VueInitialsImg);
Vue.component('zingchart', zingchartVue)
Vue.use(require('vue-moment'));
Vue.use(Toasted)
Vue.use(Vuelidate)
Vue.use(VueHtml2Canvas);
Vue.use(VueApexCharts)
Vue.use(Clipboard)
Vue.use(VueSignaturePad);
Vue.component("downloadExcel", JsonExcel);
Vue.use(HighchartsVue)

Vue.component('apexchart', VueApexCharts)

window.axios=axios
axios.defaults.baseURL = 'https://api.hayokinsurance.com';
// axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt')
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = ''

Vue.config.productionTip = false

// const DB_NAME = 'catdb';
// const DB_VERSION = 1;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
