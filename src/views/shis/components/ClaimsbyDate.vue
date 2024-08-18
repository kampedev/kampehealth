<template>
  <section class="col-md-12" style="margin-bottom:30px;">
    <div class="card">
      <div class="card-header">
        <button class="btn btn-outline-primary spacer" @click="newfilter = 7">Last 7 days</button>
        <button class="btn btn-outline-primary spacer" @click="currentPage = 30">Last 30 days</button>

      </div>
      <div class="card card-body">
        <highcharts :options="chartOptions"></highcharts>
        <button class="btn btn-outline-primary" @click="getDashboardLGA">Fetch <i class="mdi mdi-chart-bubble"></i></button>
        <caption>Showing Data for the last {{currentPage}} days.</caption>

      </div>


    </div>
  </section>

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
            chartOptions:{},
            perPage: 15,
            currentPage: 7,
            rows:"1"

        }
    },
    mounted(){
        this.getDashboardLGA();

    },
    methods:{
        getDashboardLGA(){
            // console.log("current page " + currentPage);
      this.axios.get('/api/v1/auth/claimsdate/439078?date=' + this.currentPage)
      .then(response => {
        console.log(response)
        // var data = response.data.chartData;
        var data = response.data.chartData;
        // this.rows = response.data.meta.total;

            this.chartOptions = {
                chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Claims Chart Data by Date'
                        },
                        subtitle: {
                            text: 'Claims Analysis for Kampe Health'
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
                                text: 'NUMBER OF CLAIMS REQUEST EACH DAY'
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

                                }
                            }
                        },

                        tooltip: {
                            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                        },

                        series:data.claims,
            }

        })
        },
    }
}
</script>

<style>
  .spacer{
    margin-left:1px;
    margin-top:5px;
    margin-bottom:5px;
  }
</style>
