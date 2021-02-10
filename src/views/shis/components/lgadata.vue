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
    beforeMount(){
        this.getDashboardLGA();
    },
    methods:{
        getDashboardLGA(){
      this.axios.get('/api/v1/auth/dashboardlga/2669')
      .then(response => {
        // console.log(response.data);
        var data = response.data;
        var categories  = [];
        var series = [];
        for (let index = 0; index < data.length; index++) {

            const element = data[index].name;
            const element2  = data[index].value
            if(element != "Facility"){
                categories.push(element);
                series.push(element2);
            }

            
            
            
            
            }

            console.log(series);
            this.chartOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'LGA Data'
            },
            xAxis:{
                categories: categories,
                crosshair: true
            },
            yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Enrolless'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series:[{
                name:'Enrolles', data:series
                }]
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