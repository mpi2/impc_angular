import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts';
import * as HC_map from 'highcharts/modules/map';
import * as HC_exporting from 'highcharts/modules/exporting';
import * as HC_ce from 'highcharts-custom-events';

HC_map(Highcharts);
//require('../../js/worldmap')(Highcharts);

HC_exporting(Highcharts);
HC_ce(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'orange'
    }
  }
});

@Component({
  selector: 'threei-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // For all demos:
  Highcharts = Highcharts;


  //----------------------------------------------------------------------
  // Demo #2

  // starting values
  updateDemo2 = false;
  usedIndex = 0;
  chartTitle = 'Procedure Heatmap'; // for init - change through titleChange

  // change in all places
  titleChange = function(event) {
    var v = event;
    this.chartTitle = v;
    this.charts.forEach((el) => {
      el.hcOptions.title.text = v;
    });
    // trigger ngOnChanges
    this.updateDemo2 = true;
  };

  charts = [{
    hcOptions: {

    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Procedure Heatmap'
    },

    xAxis: {
        categories: ['Homozygous viability at P14','Homozygous Fertility','Haematology','Peripheral Blood Leukocytes','Spleen','Mesenteric Lymph Node','Bone Marrow','Ear Epidermis','Anti-nuclear Antibodies','Cytotoxic T Cell Function','DSS Challenge','Influenza','Trichuris Challenge','Salmonella Challenge']
    },

    yAxis: {
        categories: ['Akt2', 'Cib2', 'DonkeyGene1', 'Whoopsy2', 'Ohooohh4'],
        title: null
    },

    colorAxis: {
      stops: [
        [0, '#3060cf'],
        [0.5, '#fffbbc'],
        [0.9, '#c4463a'],
        [1, '#c4463a']
    ],
    min: -15,
    max: 25,
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
    },

    series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        data: [[0, 0, 1], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]
  }
,
  	hcCallback: (chart) => { console.log('some variables: ', Highcharts, chart, this.charts); }
  }, {
  	hcOptions: {
      title: { text: this.chartTitle },
      subtitle: { text: '2nd data set' },
      series: [{
        type: 'column',
        data: [4, 3, -12],
        threshold: -10
      }, {
        type: 'ohlc',
        data: [
          [0, 15, -6, 7],
          [7, 12, -1, 3],
          [3, 10, -3, 3]
        ]
      }]
    },
    hcCallback: () => {}
  }, {
  	hcOptions: {
      title: { text: this.chartTitle },
      subtitle: { text: '3rd data set' },
      series: [{
        type: 'scatter',
        data: [1, 2, 3, 4, 5]
      }, {
        type: 'areaspline',
        data: [
          5,
          11,
          3,
          6,
          0
        ]
      }]
    },
    hcCallback: () => {}
  }];

  
}
