<template>
  <div>
      <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>

export default {
    data(){
        return{
            title: '',
            points: [10, 0, 8, 2, 6, 4, 5, 5],
            chartType: '',
            seriesColor: '#6fcd98',
            colorInputIsSupported: null,
            chartOptions:{}

        }
    },
    mounted(){
        this.getOrgDetails();

    },
    methods:{

          getOrgDetails() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.axios
        .get(`/api/v1/auth/getOrgDetails/${this.user.id}`)
        .then((response) => {
          this.orgDetails = response.data;
          let org_id = response.data.id;
          this.getDashboardLGA(org_id)

          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

        getDashboardLGA(org_id){
             this.user = JSON.parse(localStorage.getItem("user"));
      this.axios.get(`/api/v1/auth/DashboardLgaOrg/2676/${org_id}`)
      .then(response => {
        var data = response.data;
       
            console.log(data[0].wards);
            this.chartOptions = {
                chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Enrollees under TPA for both LGA and Ward'
                        },
                        subtitle: {
                            text: 'Click the columns to view wards.'
                        },
                        accessibility: {
                            announceNewData: {
                                enabled: true
                            }
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {
                            title: {
                                text: 'Total Enrollees'
                            }

                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            series: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true,
                                    // format: '{point.y:.1f}'
                                }
                            }
                        },

                        tooltip: {
                            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                        },

                        series: [
                            data[0].lga,
                        ],
                        drilldown: {
                            series: data[0].wards

                        }
            }

            // console.log(series);

            // this.chartOptions.xAxis.categories = categories;
            // this.chartOptions.yAxis.series = series;
            // this.chartOptions = {
            //   xAxis.categories: response.
            // }
        })
        },
    }
}
</script>

<style>

</style>
