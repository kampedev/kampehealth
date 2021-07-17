<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: "",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      chartOptions: {},
    };
  },
  mounted() {
    this.getDashboardLGA();
  },
  methods: {
    getDashboardLGA() {
      this.axios
        .get("/api/v1/auth/referralsdashboard/95930")
        .then((response) => {
          var data = response.data;

          console.log(data[0].wards);
          this.chartOptions = {
            chart: {
              type: "pie",
            },
            title: {
              text: "Referrals Distribution by Status",
            },

            accessibility: {
              announceNewData: {
                enabled: true,
              },
            },
            xAxis: {
              type: "category",
            },
            plotOptions: {
              series: {
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  // format: '{point.y:.1f}'
                },
              },
            },

            tooltip: {
              headerFormat:
                '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat:
                '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
            },

            series: data[0].referrals,
          };
        });
    },
  },
};
</script>

<style></style>
