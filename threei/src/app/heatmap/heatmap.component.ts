import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts';
import * as HC_map from 'highcharts/modules/map';
import * as HC_exporting from 'highcharts/modules/exporting';
import * as HC_ce from 'highcharts-custom-events';
import { MatRadioModule } from '@angular/material';

import { HeatmapService } from '../heatmap.service';

HC_map(Highcharts);
//require('../../js/worldmap')(Highcharts);

HC_exporting(Highcharts);
HC_ce(Highcharts);

Highcharts.setOptions({

    chart: {
        type: 'heatmap',
        marginTop: 200,
        marginBottom: 80,
        plotBorderWidth: 1,
        height: 20000
    },

    // click: function(e) {
    //     console.log(
    //         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
    //         e.yAxis[0].value
    //     )
    // },

    title: {
        text: 'Procedure Heatmap'
    },

    xAxis: { 
      opposite: true,
        categories: [
              'Homozygous viability at P14',
                   'Homozygous Fertility',
                  'Haematology',
                   'Peripheral Blood Leukocytes',
                 'Spleen',
                   "Mesenteric Lymph Node",
                 'Bone Marrow',
                  'Ear Epidermis',
                  'Anti-nuclear Antibodies',
                  'Cytotoxic T Cell Function',
                  'DSS Challenge',
                   'Influenza',
                  'Trichuris Challenge',
                  'Salmonella Challenge'],
        labels: {
            rotation: 90
        },
        reserveSpace: true,
      },

    yAxis: {
        categories: [
            'Homozygous viability at P14',
                 'Homozygous Fertility',
                'Haematology',
                 'Peripheral Blood Leukocytes',
               'Spleen',
                 "Mesenteric Lymph Node",
               'Bone Marrow',
                'Ear Epidermis',
                'Anti-nuclear Antibodies',
                'Cytotoxic T Cell Function',
                'DSS Challenge',
                 'Influenza',
                'Trichuris Challenge',
                'Salmonella Challenge'],
        title: null
    },

    colorAxis: {

      dataClasses: [{
        from: 0,
        to: 1,
        color: '#ffffff',
        name: 'No Data'
    }, {
        from: 1,
        to: 2,
        color: '#808080',
        name: 'Not enough data'
    }, {
        from: 2,
        to: 3,
        color: '#0000ff',
        name: 'Not Significantly Different'
    }, {
        from: 3,
        to: 4,
        color: '#c4463a',
        name: 'Significantly Different'
    }
      // stops: [
      //   [0, '#ffffff', 'no data'],
      //   [0.25, '#2f4259'],
      //   [0.5, '#0000ff'],
      //   [0.75, '#c4463a']

        // [0, '#3060cf'],
        // [0.25, '#fffbbc'],
        // [0.5, '#2f4259'],
        // [0.75, '#c4463a']
    ],
    min: 0,
    max: 4,
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        // margin: 0,
        verticalAlign: 'top',
        // y: 25,
        // symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br/>' +
            this.series.colorAxis.dataClasses[this.point.dataClass].name + '</b><br>'+
            '<b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
    },
    plotOptions: {
      series: {
          events: {
              click: function (e) {
                  // var text = '<b>Clicked</b><br>Series: ' + this.name +
                  //         '<br>Point: ' + e.point.name + ' (' + e.point.value + '/km²)';
                 
                  //may have to use routerLink like for menus to link to our new not created yet parameter page
                    //var url = "http://starwars.com";
                    //window.open(url,'_blank');
                      // this.chart.clickLabel.attr({
                      //     text: text
                      // });
                  
              }
          }
      }
  },

    series: [{
        name: 'Procedures with significant parameters',
        borderWidth: 1,
        data: [[0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 3], [1, 0, 0], [1, 1, 1], [1, 2, 2], [1, 3, 3], [1, 4, 3]],
        //, [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: false,
            color: '#000000'
        }
    }]
});




@Component({
  selector: 'threei-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  
    heatmapChart={

    chart: {
        type: 'heatmap',
        marginTop: 200,
        marginBottom: 80,
        plotBorderWidth: 1,
        height: 20000
    },

    // click: function(e) {
    //     console.log(
    //         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
    //         e.yAxis[0].value
    //     )
    // },

    title: {
        text: 'Procedure Heatmap'
    },

    xAxis: { 
      opposite: true,
        categories: [
              'Homozygous viability at P14',
                   'Homozygous Fertility',
                  'Haematology',
                   'Peripheral Blood Leukocytes',
                 'Spleen',
                   "Mesenteric Lymph Node",
                 'Bone Marrow',
                  'Ear Epidermis',
                  'Anti-nuclear Antibodies',
                  'Cytotoxic T Cell Function',
                  'DSS Challenge',
                   'Influenza',
                  'Trichuris Challenge',
                  'Salmonella Challenge'],
        labels: {
            rotation: 90
        },
        reserveSpace: true,
      },

    yAxis: {
        categories: [
            'Homozygous viability at P14',
                 'Homozygous Fertility',
                'Haematology',
                 'Peripheral Blood Leukocytes',
               'Spleen',
                 "Mesenteric Lymph Node",
               'Bone Marrow',
                'Ear Epidermis',
                'Anti-nuclear Antibodies',
                'Cytotoxic T Cell Function',
                'DSS Challenge',
                 'Influenza',
                'Trichuris Challenge',
                'Salmonella Challenge'],
        title: null
    },

    colorAxis: {

      dataClasses: [{
        from: 0,
        to: 1,
        color: '#ffffff',
        name: 'No Data'
    }, {
        from: 1,
        to: 2,
        color: '#808080',
        name: 'Not enough data'
    }, {
        from: 2,
        to: 3,
        color: '#0000ff',
        name: 'Not Significantly Different'
    }, {
        from: 3,
        to: 4,
        color: '#c4463a',
        name: 'Significantly Different'
    }
      // stops: [
      //   [0, '#ffffff', 'no data'],
      //   [0.25, '#2f4259'],
      //   [0.5, '#0000ff'],
      //   [0.75, '#c4463a']

        // [0, '#3060cf'],
        // [0.25, '#fffbbc'],
        // [0.5, '#2f4259'],
        // [0.75, '#c4463a']
    ],
    min: 0,
    max: 4,
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        // margin: 0,
        verticalAlign: 'top',
        // y: 25,
        // symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br/>' +
            this.series.colorAxis.dataClasses[this.point.dataClass].name + '</b><br>'+
            '<b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
    },
    plotOptions: {
      series: {
          events: {
              click: function (e) {
                  // var text = '<b>Clicked</b><br>Series: ' + this.name +
                  //         '<br>Point: ' + e.point.name + ' (' + e.point.value + '/km²)';
                 
                  //may have to use routerLink like for menus to link to our new not created yet parameter page
                    //var url = "http://starwars.com";
                    //window.open(url,'_blank');
                      // this.chart.clickLabel.attr({
                      //     text: text
                      // });
                  
              }
          }
      }
  },

    series: [{
        name: 'Procedures with significant parameters',
        borderWidth: 1,
        data: [[0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 3], [1, 0, 0], [1, 1, 1], [1, 2, 2], [1, 3, 3], [1, 4, 3]],
        //, [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: false,
            color: '#000000'
        }
    }]
};
    //heatmapChart: { chart: { type: string; marginTop: number; marginBottom: number; plotBorderWidth: number; height: number; }; title: { text: string; }; xAxis: { opposite: boolean; categories: string[]; labels: { rotation: number; }; reserveSpace: boolean; }; yAxis: { categories: string[]; title: any; }; colorAxis: { dataClasses: { from: number; to: number; color: string; name: string; }[]; min: number; max: number; }; legend: { align: string; layout: string; verticalAlign: string; }; tooltip: { formatter: () => string; }; plotOptions: { series: { events: { click: (e: any) => void; }; }; }; series: { name: string; borderWidth: number; data: number[][]; dataLabels: { enabled: boolean; color: string; }; }[]; };

  


 
  // only order that procedures headers are displayed in
  // procedureDisplayHeaderOrder : Array<string>= [
  //   'Homozygous viability at P14',
  //        'Homozygous Fertility',
  //       'Haematology',
  //        'Peripheral Blood Leukocytes',
  //      'Spleen',
  //        "Mesenteric Lymph Node",
  //      'Bone Marrow',
  //       'Ear Epidermis',
  //       'Anti-nuclear Antibodies',
  //       'Cytotoxic T Cell Function',
  //       'DSS Challenge',
  //        'Influenza',
  //       'Trichuris Challenge',
  //       'Salmonella Challenge'];
  readonly PROCEDURE_DATA_INDEX = 0;
  readonly CELL_DATA_INDEX = 1;
        data: number[][]=[[]];
        data2:number[][]=[[]];
        headers: string[];//http response headers
        columnHeaders: string[];
        rowHeaders: string[];
        response: Response;

        columnHeaders2: string[];
        rowHeaders2: string[];
        response2: Response;

        updateDemo2 = false;
  usedIndex = 0;
  chartTitle = 'Procedure Heatmap'; // for init - change through titleChange
  
//   .hcOptions: {
//     hcOptions: {
//     title: { text: this.chartTitle },
//     subtitle: { text: '2nd data set' },
//     series: [{
//       type: 'column',
//       data: [4, 3, -12],
//       threshold: -10
//     }, {
//       type: 'ohlc',
//       data: [
//         [0, 15, -6, 7],
//         [7, 12, -1, 3],
//         [3, 10, -3, 3]
//       ]
//     }]
//   },
//   hcCallback: () => {}
// }
  

  constructor(private heatmapService: HeatmapService) { 
    
  }

  ngOnInit() {
      
    
  }

  ngAfterViewInit() {
        
    // this.displayCellChart();
    //this.getHeatmapResponse();
     this.getProcedureHeatmapData();
    // //this.getCellHeatmapData();
    // this.updateDemo2=true;
  }


  // getHeatmapResponse(){
  //  this.heatmapService.getHeatmapResponse()
  //     // resp is of type `HttpResponse<Config>`
  //     .subscribe(resp => {
  //       // display its headers
  //       const keys = resp.headers.keys();
  //       this.headers = keys.map(key =>
  //         `${key}: ${resp.headers.get(key)}`);
  //         //console.log('headers=' + this.headers);
  //       // access the body directly, which is typed as `Config`.
  //       this.response = { ... resp.body };
  //       //this.data = this.response['response']['docs']
  //       console.log('response here: '+JSON.stringify(this.response['_embedded'].Data[0]['data']));
  //       this.data=this.response['_embedded'].Data[0]['data'];
  //       this.columnHeaders=this.response['_embedded'].Data[0]['columnHeaders'];
  //       this.rowHeaders=this.response['_embedded'].Data[0]['rowHeaders'];
  //       this.updateDemo2=true;//can we force it to update like this?
  //       this.displayProcedureChart();
  //     });
  // }

  getProcedureHeatmapData(){
    console.log('data length='+this.data)
    //if(this.data.length<=1){
    this.heatmapService.getHeatmapResponse().subscribe(resp => {
      // display its headers
      this.response = { ... resp.body};
      //console.log('response='+JSON.stringify(resp));
      //this.data = this.response['response']['docs']
      //console.log('response from json file here: '+JSON.stringify(this.response['_embedded'].Data[0]['data']));
      this.data=this.response['_embedded'].Data[this.PROCEDURE_DATA_INDEX]['data'];
      //let headerData=this.response['_embedded'].Data[0]['columnHeaders'];
      this.columnHeaders=[
        '<[routerLink]="" (click)="onGoToPage2()">Homozygous viability at P14</a>',
        "Homozygous Fertility",
        "Haematology",
        "Peripheral Blood Leukocytes",
        "Spleen",
        "Mesenteric Lymph Node",
        "Bone Marrow",
        "Ear Epidermis",
        "Anti-nuclear Antibodies",
        "Cytotoxic T Cell Function",
        "DSS Challenge",
        "Influenza",
        "Trichuris Challenge",
        "Salmonella Challenge"
        ];
      this.rowHeaders=this.response['_embedded'].Data[0]['rowHeaders'];

      this.data2=this.response['_embedded'].Data[this.CELL_DATA_INDEX]['data'];
      this.columnHeaders2=this.response['_embedded'].Data[this.CELL_DATA_INDEX]['columnHeaders'];
      this.rowHeaders2=this.response['_embedded'].Data[this.CELL_DATA_INDEX]['rowHeaders'];
      this.displayProcedureChart();
      this.updateDemo2=true;//can we force it to update like this?

      
    });

   
    //}
  }

//   getCellHeatmapData(){
//     this.heatmapService.getCell.subscribe(resp => {
//       // display its headers
//       this.response2 = { ... resp};
//       //console.log('cell heatmap response='+JSON.stringify(resp));
//       //this.data = this.response['response']['docs']
//       //console.log('response from json file here: '+JSON.stringify(this.response['_embedded'].Data[1]['data']));
//       this.data2=this.response['_embedded'].Data[this.CELL_DATA_INDEX]['data'];
//       this.columnHeaders2=this.response['_embedded'].Data[this.CELL_DATA_INDEX]['columnHeaders'];
//       this.rowHeaders2=this.response['_embedded'].Data[this.CELL_DATA_INDEX]['rowHeaders'];
//       this.displayCellChart();
//       this.updateDemo2=true;//can we force it to update like this?
//     });
//   }

  getCellHeatmapData(){
    
      //console.log('cell heatmap response='+JSON.stringify(resp));
      //this.data = this.response['response']['docs']
      //console.log('response from json file here: '+JSON.stringify(this.response['_embedded'].Data[1]['data']));
      
      this.displayCellChart();
      this.updateDemo2=true;//can we force it to update like this?
    
  }
  // For all demos:
  Highcharts = Highcharts;

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
  



  displayProcedureChart(){
  
console.log('calling display chart method');
  
this.heatmapChart= {

    chart: {
        type: 'heatmap',
        marginTop: 200,
        marginBottom: 80,
        plotBorderWidth: 1,
        height: 20000
    },

    // click: function(e) {
    //     console.log(
    //         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
    //         e.yAxis[0].value
    //     )
    // },

    title: {
        text: 'Procedure Heatmap'
    },

    xAxis: { 
      opposite: true,
        categories: this.columnHeaders,
        labels: {
            rotation: 90
        },
        reserveSpace: true,
      },

    yAxis: {
        categories: this.rowHeaders,
        title: null
    },

    colorAxis: {

      dataClasses: [{
        from: 0,
        to: 1,
        color: '#ffffff',
        name: 'No Data'
    }, {
        from: 1,
        to: 2,
        color: '#808080',
        name: 'Not enough data'
    }, {
        from: 2,
        to: 3,
        color: '#0000ff',
        name: 'Not Significantly Different'
    }, {
        from: 3,
        to: 4,
        color: '#c4463a',
        name: 'Significantly Different'
    }
      // stops: [
      //   [0, '#ffffff', 'no data'],
      //   [0.25, '#2f4259'],
      //   [0.5, '#0000ff'],
      //   [0.75, '#c4463a']

        // [0, '#3060cf'],
        // [0.25, '#fffbbc'],
        // [0.5, '#2f4259'],
        // [0.75, '#c4463a']
    ],
    min: 0,
    max: 4,
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        // margin: 0,
        verticalAlign: 'top',
        // y: 25,
        // symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br/>' +
            this.series.colorAxis.dataClasses[this.point.dataClass].name + '</b><br>'+
            '<b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
    },
    plotOptions: {
      series: {
          events: {
              click: function (e) {
                  // var text = '<b>Clicked</b><br>Series: ' + this.name +
                  //         '<br>Point: ' + e.point.name + ' (' + e.point.value + '/km²)';
                 
                  //may have to use routerLink like for menus to link to our new not created yet parameter page
                    //var url = "http://starwars.com";
                    //window.open(url,'_blank');
                      // this.chart.clickLabel.attr({
                      //     text: text
                      // });
                  
              }
          }
      }
  },

    series: [{
        name: 'Procedures with significant parameters',
        borderWidth: 1,
        data: this.data,
        //data: [[0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 3], [1, 0, 0], [1, 1, 1], [1, 2, 2], [1, 3, 3], [1, 4, 3]],
        //, [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: false,
            color: '#000000'
        }
    }]
}
  }//end of display method
  


  displayCellChart(){
  
    console.log('calling display cell chart method');
      
    this.heatmapChart= {
    
        chart: {
            type: 'heatmap',
            marginTop: 200,
            marginBottom: 80,
            plotBorderWidth: 1,
            height: 17000
        },
    
    
        title: {
            text: 'Cell Type Heatmap'
        },
    
        xAxis: { 
          opposite: true,
            categories: this.columnHeaders2,
            labels: {
                rotation: 90
            },
            reserveSpace: true,
          },
    
        yAxis: {
            categories: this.rowHeaders2,
            title: null
        },
    
        colorAxis: {
    
          dataClasses: [{
            from: 0,
            to: 1,
            color: '#ffffff',
            name: 'No Data'
        }, {
            from: 1,
            to: 2,
            color: '#808080',
            name: 'Not enough data'
        }, {
            from: 2,
            to: 3,
            color: '#0000ff',
            name: 'Not Significantly Different'
        }, {
            from: 3,
            to: 4,
            color: '#c4463a',
            name: 'Significantly Different'
        }
          // stops: [
          //   [0, '#ffffff', 'no data'],
          //   [0.25, '#2f4259'],
          //   [0.5, '#0000ff'],
          //   [0.75, '#c4463a']
    
            // [0, '#3060cf'],
            // [0.25, '#fffbbc'],
            // [0.5, '#2f4259'],
            // [0.75, '#c4463a']
        ],
        min: 0,
        max: 4,
        },
    
        legend: {
            align: 'right',
            layout: 'vertical',
            // margin: 0,
            verticalAlign: 'top',
            // y: 25,
            // symbolHeight: 280
        },
    
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br/>' +
                this.series.colorAxis.dataClasses[this.point.dataClass].name + '</b><br>'+
                '<b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },
        plotOptions: {
          series: {
              events: {
                  click: function (e) {
                      // var text = '<b>Clicked</b><br>Series: ' + this.name +
                      //         '<br>Point: ' + e.point.name + ' (' + e.point.value + '/km²)';
                     
                      //may have to use routerLink like for menus to link to our new not created yet parameter page
                        var url = "http://starwars.com";
                        window.open(url,'_blank');
                          // this.chart.clickLabel.attr({
                          //     text: text
                          // });
                      
                  }
              }
          }
      },
    
        series: [{
            name: 'Cell types with significant parameters',
            borderWidth: 1,
            //data: this.data,
            data: this.data2,
            //, [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
            dataLabels: {
                enabled: false,
                color: '#000000'
            }
        }],
        
      }
    };//end of display method



    //   onChartLoad(chart) {
    //       console.log('loading onchartload method');
    //     this.chartOptions = chart;
    //     var t = chart.legend.title.element.children[0].children[1]
    //     t.onclick = () => this.onLegendTitleClick()
    //   }
      
    //   onLegendTitleClick() {
    //     console.log('title clicked', this)
    //   }
      

//       this.chart.xAxis[0].labelGroup.element.childNodes.forEach(function(label)
// {
// 	label.style.cursor = "pointer";
//   label.onclick = function(){
//   	alert('You clicked on '+this.textContent);
//   }
// });

    //   if (sortByCol!=-1) {
    //     if (sortByCol==null)   sortByCol=0;
    //     else   // populated
    //     if (_heatmap_sortBy == sortByCol)
    //         _heatmap_sortByReversed=(_heatmap_sortByReversed?false:true);

    //     _heatmap_sortBy = sortByCol;
    //     //console.log('sortByCol:::', sortByCol);
    //     //console.log('rows:::', JSON.stringify(heatmap_rows));
    //     heatmap_rows.sort(function(a,b) {
    //         if(a[sortByCol] > 3 || b[sortByCol] > 3) {
    //             a[sortByCol] = b[sortByCol] = 0;
    //         }
    //         //console.log('sortByCol A:::', a[sortByCol]);
    //         if(a[sortByCol]<b[sortByCol]) return (_heatmap_sortByReversed?1:-1)
    //         if(a[sortByCol]>b[sortByCol]) return (_heatmap_sortByReversed?-1:1)
    //         return 0;

    //     })
    // }

      
}
