<template>
  <section class="col-md-12" style="margin-bottom:30px;">
    <div class="card">
      <div class="card-header">
        <button class="btn btn-outline-primary spacer" @click="newfilter = 7">Last 7 days</button>
        <button class="btn btn-outline-primary spacer" @click="currentPage = 30">Last 30 days</button>
        <a href="/list-records">
        <button class="btn btn-outline-success spacer" >View Encounters</button>
         </a>
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
            user: null,
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
     beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
  
  },
    mounted(){
        this.getDashboardLGA();

    },
    methods:{
        getDashboardLGA(){
         this.user = JSON.parse(localStorage.getItem('user'))
      this.axios.get(`/api/v1/auth/provider-encountersdate/${this.user.id}?date=` + this.currentPage)
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
                            text: 'Hospital Encounters/Visitation Data by Date'
                        },
                        subtitle: {
                            text: 'Hosptital Visitation Analysis for State Contributory Health Care Scheme'
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
                                text: 'NUMBER OF VISITATIONS EACH DAY'
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
