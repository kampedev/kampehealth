<template>
  <section class="col-md-12" style="margin-bottom: 30px">
    <div class="card">
      <div class="card-header">
        <a href="/my-encounters">
          <button class="btn btn-outline-success spacer">
            View Encounters
          </button>
        </a>
      </div>
      <div class="card card-body">
        <highcharts :options="chartOptions"></highcharts>

        <b-pagination
          v-model="currentPage"
          :total-rows="charts[0].lga.data.total"
          :per-page="perPage"
          limit="10"
          aria-controls="my-table"
          @input="getDashboardLGA(currentPage ? currentPage : 1)"
        ></b-pagination>
      </div>
    </div>
  </section>
</template>
    
    <script>
export default {
  data() {
    return {
      title: "",
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: "",
      charts: [
        {
          lga: {
            data: {},
          },
        },
      ],
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      chartOptions: {},
      perPage: 50,
      currentPage: 1,
      rows: "1",
    };
  },
  mounted() {
    this.getDashboardLGA(1);
  },
  methods: {
    getDashboardLGA(currentPage) {
      this.axios
        .get("/api/v1/auth/diagnosisChart/95930?page=" + currentPage)
        .then((response) => {
          console.log(response);
          var data = response.data;
          this.charts = response.data;
          this.chartOptions = {
            chart: {
              type: "column",
            },
            title: {
              text: "Diagnosis Chart",
            },
            subtitle: {
              text: "Provider Visitation Analysis for Based on Diagnosis",
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
                text: "NUMBER OF VISITATIONS FOR DIAGNOSES",
              },
            },
            legend: {
              enabled: false,
            },
            plotOptions: {
              series: {
                colorByPoint: true,
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

            series: data[0].lga.data,
          };
        });
    },
  },
};
</script>
    
    <style>
.spacer {
  margin-left: 1px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
    