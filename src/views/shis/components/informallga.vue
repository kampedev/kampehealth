<template>
  <div class="row">
    <div class="col-md-12 p-t-20">
      <h5 class="h5">Enrollment Data</h5>
    </div>

    <div class="col-md-12">
      <div class="card m-b-30">
        <div class="card-header">
          <div class="row">
            <button
              v-for="plan in plans"
              :key="plan"
              type="button"
              class="btn btn-outline-primary m-2"
              @click="getChart(plan)"
            >
              {{ plan }}
            </button>
          </div>
        </div>

        <div class="card-body">
          <highcharts :options="chartOptions"></highcharts>
        </div>
      </div>
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
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      plans: "",
      title: "",
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: "",
      sector: "Kampe Healthcare Plus",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      chartOptions: {},
    };
  },
  mounted() {
    this.getDashboardLGA();
  },
  methods: {
    getChart(param) {
      this.isLoading = true;
      this.sector = param;
      this.getDashboardLGA();
      this.isLoading = false;
    },
    getDashboardLGA() {
      this.axios
        .post("/api/v1/auth/DashboardLgaDataPrincipal/2676", {
          sector: this.sector,
        })
        .then((response) => {
          var data = response.data;
          console.log(data[0].wards);
          this.chartOptions = {
            chart: {
              type: "column",
            },
            title: {
              text: `${this.sector} Enrollees Distributed By LGA`,
            },
            subtitle: {
              text: "Click the columns to view wards.",
            },
            accessibility: {
              announceNewData: {
                enabled: true,
              },
            },
            xAxis: {
              type: "category",
            },
            yAxis: {
              title: {
                text: "NUMBER OF ENROLLEES",
              },
            },
            legend: {
              enabled: false,
            },
            plotOptions: {
              series: {
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                },
              },
            },

            tooltip: {
              headerFormat:
                '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat:
                '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
            },

            series: [data[0].lga],
            drilldown: {
              series: data[0].wards,
            },
          };
        });
    },

    getPlans() {
      this.axios
        .get(`/api/v1/auth/plans-from-users/439078`)
        .then((response) => {
          this.plans = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getPlans();
  },
};
</script>
  
  <style>
</style>
  