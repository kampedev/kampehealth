import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import CKEditor from "@ckeditor/ckeditor5-vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import { BreadstickBakery } from "breadstick";
import VueFilterDateFormat from "vue-filter-date-format";
import vueNumeralFilterInstaller from "vue-numeral-filter";
import VueInitialsImg from "vue-initials-img";

import Toasted from "vue-toasted";
import Vuelidate from "vuelidate";
import VueHtml2Canvas from "vue-html2canvas";
import VueApexCharts from "vue-apexcharts";
import Clipboard from "v-clipboard";
import VueSignaturePad from "vue-signature-pad";
import JsonExcel from "vue-json-excel";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Highcharts from "highcharts";
import VueHighcharts from "vue-highcharts";
import { BootstrapVue } from "bootstrap-vue";


import HighchartsVue from "highcharts-vue";
import loadDrilldown from "highcharts/modules/drilldown";
import loadHighchartsMore from "highcharts/highcharts-more";
import loadSolidGauge from "highcharts/modules/solid-gauge";
import loadExporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";
import loadOfflineExporting from "highcharts/modules/offline-exporting";
import loadBoost from "highcharts/modules/boost";
import loadStock from "highcharts/modules/stock";
import loadMap from "highcharts/modules/map";
import { defineCustomElements } from '@ionic/pwa-elements/loader';


loadStock(Highcharts);
loadMap(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts);
loadExporting(Highcharts);
loadOfflineExporting(Highcharts);

Vue.use(VueHighcharts, { Highcharts: Highcharts });
// load up the boost modules
loadBoost(Highcharts);
ExportData(Highcharts);
Vue.use(CKEditor);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.use(BreadstickBakery);
Vue.use(VueFilterDateFormat);
Vue.use(vueNumeralFilterInstaller);
Vue.use(VueInitialsImg);
// Vue.component("zingchart", zingchartVue);
Vue.use(require("vue-moment"));
Vue.use(Toasted);
Vue.use(Vuelidate);
Vue.use(VueHtml2Canvas);
Vue.use(VueApexCharts);
Vue.use(Clipboard);
Vue.use(VueSignaturePad);
Vue.component("downloadExcel", JsonExcel);
Vue.component("apexchart", VueApexCharts);
Vue.component("v-select", vSelect);
Vue.use(HighchartsVue);
Vue.use(BootstrapVue);
// Vue.use(VueFullscreen);
defineCustomElements(window);

window.axios = axios;
axios.defaults.baseURL = "https://kampe.hayokmedicare.ng";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:8080"
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("jwt");
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = ''

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
