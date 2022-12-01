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
        this.getDashboardLGA();

    },
    methods:{
        getDashboardLGA(){
      this.axios.get('/api/v1/auth/dashboardlgainformal/2676')
      .then(response => {
        // console.log(response.data);
        var data = response.data;
       

            console.log(data[0].wards);
            this.chartOptions = {
                chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Basic Healthcare Provision Fund'
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
                                text: 'NUMBERS OF VULNERABLE ENROLLED'
                            }

            // STATE CIVIL HEALTH CARE PLAN
            // NUMBER OF STATE CIVIL SERVANT ENROLLED
            // FACILTY DISTRIBUTION
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

        })
        },
    }
}
</script>

<style>

</style>
