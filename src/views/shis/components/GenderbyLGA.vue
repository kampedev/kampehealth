<template>
  <div class="card">
    <div class="card-header">
    
      <div class="row">
        <button
          class="btn btn-outline-primary mx-2 my-2"
          v-for="sector in sectors"
          v-bind:key="sector.name"
          @click="selectSector(sector)"
        >
          {{ sector.name }}
        </button>
      </div>
    </div>
    <div class="card-body">
      <highcharts :options="chartOptions"></highcharts>
    </div>

    <div class="vld-parent">
              <loading
                :active.sync="isLoading"
                loader="dots"
                :can-cancel="true"
                :is-full-page="fullPage"
              ></loading>
            </div>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["sectors"],
  components:{
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: false,
      title: "",
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: "",
      selected_sector: "Basic Healthcare Provision Fund",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      chartOptions: {},
    };
  },
  mounted() {
    this.getDashboardLGA();
  },
  methods: {
    selectSector(sector) {
      this.selected_sector = sector.name;
      this.getDashboardLGA();
    },
    getDashboardLGA() {
      this.isLoading = true
      this.axios
        .get(`/api/v1/auth/enrolleesbylgabygender/2676/${this.selected_sector}`)
        .then((response) => {
          var data = response.data;
          this.isLoading = false
          data;
          this.chartOptions = {
            chart: {
              type: "column",
            },
            title: {
              text: ` ${this.selected_sector} Enrollees by Gender`,
            },
            subtitle: {
              text: "Distributed by LGA",
            },
            xAxis: {
              categories: response.data.lgas,
              crosshair: true,
            },
            yAxis: {
              min: 0,
              title: {
                text: "Total Enrollees",
              },
            },
            tooltip: {
              headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              footerFormat: "</table>",
              shared: true,
              useHTML: true,
            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0,
              },
            },
            series: [
              {
                name: "Male",
                data: response.data.male_data,
              },
              {
                name: "Female",
                data: response.data.female_data,
              },
            ],
          };
        });
    },
  },
};
</script>

<style>
</style>
