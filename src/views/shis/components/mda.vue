<template>
  <div>
      <highcharts :options="chartOptions"></highcharts>
        <br />
      <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      @input="getDashboardLGA(currentPage? currentPage: 1)"
    ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>

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
            chartOptions:{},
            perPage: 15,
            currentPage: 1,
            rows:"1"

        }
    },
    mounted(){
        this.getDashboardLGA();

    },
    methods:{
        getDashboardLGA(currentPage){
            console.log("current page " + currentPage);
      this.axios.get('/api/v1/auth/dashboardmda/439078?page=' + currentPage)
      .then(response => {
        // console.log(response.data);
        var data = response.data.chartData;
        this.rows = response.data.meta.total;
        // this.currentPage = response.data.meta.current_page;
        // this.perPage =
        // console.log(response);
        // var seriesb = data[0].wards
        // var categories  = [];
        // var series = [];
        // for (let index = 0; index < seriesb.length; index++) {

        //     const element = seriesb[index];

        //     categories.push(element[index]);
        //     }

            this.chartOptions = {
                chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Ministries Departments and Parastatals'
                        },
                        subtitle: {
                            text: 'Enrollees Analysis for Kampe Health'
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
                                text: 'NUMBER OF STATE CIVIL SERVANT ENROLLED'
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

                        series:data[0].mda,
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
