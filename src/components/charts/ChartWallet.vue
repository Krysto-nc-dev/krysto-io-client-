<script>

import { Line } from 'vue-chartjs'

//const config = require('../../config/' + process.env.NODE_ENV)

// var color = ["#2196F3", "#4CAF50", "#009688", "#FF6F00", "#FFD54F", "#A1887F", "#1fdffb",
//             "#8C9EFF", "#536DFE", "#EF5350", "#D81B60", "#8E24AA", "#B39DDB", "#7B1FA2", "#D4E157",
//             "#9CCC65", "#689F38", "#78909C", ]

var randColor = "#4bb39a"

export default {
  extends: Line,
  props: [ 'timeStr' ],
  data: () => ({
        chartData: {
              labels: [], //"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [{
                label: "Montant",
                lineTension: 0.3,
                backgroundColor: "#4bb39a29",
                color: randColor,
                borderColor: randColor,
                borderWidth: 2,
                pointRadius: 3,
                tickColor: "red",
                pointBackgroundColor: randColor,
                pointBorderColor: randColor,
                pointHoverRadius: 3,
                pointHoverBackgroundColor: randColor,
                pointHoverBorderColor: randColor,
                pointHitRadius: 10,
                pointBorderWidth: 1,
                data: []
            }],
            },
        chartOptions: {
            maintainAspectRatio: false,
            layout: {
            padding: {
                left: 5,
                right: 15,
                top: 10,
                bottom: 0
            }
            },
            scales: {
              xAxes: [{
                  time: {
                      unit: 'date'
                  },
                  gridLines: {
                      display: true,
                      drawBorder: true,
                      color: '#ccc',
                      borderDash: [1],
                  },
                  ticks: {
                      //maxTicksLimit: 5,
                      // callback: function(value) {
                      //     return Math.round(value/30) + ' mois';
                      //     }
                  }
              }],
              yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 10,
                    padding: 0,
                    // Include a dollar sign in the ticks
                    callback: function(value) {
                        return value + " ò";
                    }
                  },
                  gridLines: {
                    color: "rgb(50, 50, 50, 0.2)",
                    zeroLineColor: "rgb(50, 50, 50, 0.5)",
                    drawBorder: false,
                    borderDash: [1],
                    zeroLineBorderDash: [0]
                  }
              }],
            },
            legend: {
                display: false
            },
            tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 5,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
                label: function(tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ' : ' + tooltipItem.yLabel;
                //return datasetLabel + ' : ' + number_format(tooltipItem.yLabel) + ' J';
                }
            }
            }
        }
  }),
  mounted: function(){  
    //console.log("CHART MOUNTED")
    
    this.initChart()
    
    this.$root.$off('addToChartWallet').$on('addToChartWallet', (data, label) => { 
        //console.log("addToChartWallet", data, label)
        this.addToChart(data, label)
        this.$data._chart.update()
    })
    this.$root.$off('rebootChartWallet').$on('rebootChartWallet', () => { 
        this.chartData.datasets[0].data = []
        this.chartData.labels = []
        this.$data._chart.update()
    })
    this.$root.$off('rerenderChartWallet').$on('rerenderChartWallet', () => { 
        //console.log("rerenderChartWallet")
        this.initChartWallet()
    })

    this.initChartWallet()

  },
  
  methods: {
    myRenderChart : async function(){
        //console.log("renderChart", this.chartData.data, this.chartOptions)
        this.renderChart(this.chartData, this.chartOptions)
    },
    
    async initChart () {
        //this.chartData.datasets = []
        //this.chartData.labels = []
        this.renderChart(this.chartData, this.chartOptions)
    },
    addToChart: function(data, label){
      if(this.chartData.datasets[0].data.length > 60){ //48 * 5min = 4h
          this.chartData.datasets[0].data.shift()
          this.chartData.labels.shift()
      }
      this.chartData.datasets[0].data.push(data)

      //let now = new Date()
      label = label == null ? this.timeStr : label //now.getMinutes()+":"+now.getSeconds()
      //console.log("addToChart label", label)
      this.chartData.labels.push(label)
    },

    getRandColor (){
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    },

    initChartWallet(){
      this.chartData.datasets[0].data = []
      this.chartData.labels = []

      this.$store.getters['auth/amountHistory'].forEach((hist) =>{
        if(hist){
          //console.log("hist", hist)
          
          let day = hist.date.getDate() < 10 ? '0'+hist.date.getDate() : hist.date.getDate() 
          let month = hist.date.getMonth() < 9 ? '0'+ (hist.date.getMonth()+1) : (hist.date.getMonth()+1)
          let label = day + "/" + month + "/" + hist.date.getFullYear()
          this.addToChart(hist.amount, label)
        }
      })

      this.$data._chart.update()
    }
  },
}
/*

*/

</script>