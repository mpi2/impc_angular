import { Result } from './../../shared/result.model';
import { SolrService } from './../../shared/solr.service';
import { Chart, Highcharts } from 'angular-highcharts';
import { Component } from '@angular/core';
import { RawDataService } from '../../shared/raw-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'impc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  chartData = {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
      width: 1200
    },
    title: {
      text: 'Scatter plot'
    },
    credits: {
      enabled: false
    },
    series: [],
    xAxis: {
      type: 'datetime',
      plotLines: [],
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      max: 0,
      min: 0,
      startOnTick: true,
      endOnTick: true,
      maxPadding: 1
    },
    tooltip: {
      formatter: function() {
        if (this.series.name === 'Window') {
          const min = this.series.yAxis.dataMin;
          const max = this.series.yAxis.dataMax;
          const y = (this.y - min) / (max - min);
          return (
            '<b>' +
            this.series.name +
            '</b><br/>' +
            Highcharts.dateFormat('%e %b %Y', this.x) +
            '<br/> weight: ' +
            y
          );
        } else {
          return (
            '<b>' +
            this.series.name +
            '</b><br/>' +
            Highcharts.dateFormat('%e %b %Y', this.x) +
            '<br/> value: ' +
            this.y
          );
        }
      }
    }
  };

  results = new Array<Result>();
  metadataGroups = [];
  isLoadingResults = false;

  updateChart(value) {
    this.results = [];
    const procedureName = value.procedure.split(' | ')[0];
    const parameterName = value.parameter.split(' | ')[0];
    const procedureID = value.procedure.split(' | ')[1];
    const parameterID = value.parameter.split(' | ')[1];
    this.metadataGroups = value.metadata.split(',');
    this.isLoadingResults = true;
    this.metadataGroups.forEach((metadataGroup, i) => {
      this.rawService
        .getWindowData(
          value.center,
          value.colonyID,
          value.zygosity,
          procedureID,
          parameterID,
          metadataGroup,
          value.version
        )
        .then(data => {
          const result = new Result();
          result.oldData = data.oldData;
          result.newData = data.newData;
          result.oldPValue = data.oldPValue.toExponential(2);
          result.newPValue = data.newPvalue.toExponential(2);
          result.pValueDiff = data.newPvalue - data.oldPValue;
          result.rawLink = data.rawLink;
          result.portalLink = data.portalLink;
          result.resultsLink = data.resultsLink;
          result.method = data.method;
          result.notProcessedReasons = data.notProcessedReasons;
          result.minSamplesReq = data.minSamplesReq;
          result.samplesInWindow = data.samplesInWindow;
          result.k = data.k;
          result.l = data.l;
          const chart = { ...this.chartData };
          chart.series = [];
          data.series.forEach(serie => {
            chart.series.push(serie);
          });

          chart.title.text = procedureName + ': ' + parameterName;
          this.solr.getParameterUnit(parameterID).subscribe(unit => {
            chart.yAxis.title.text = parameterName;
            if (unit !== ' ') {
              chart.yAxis.title.text += ` (${unit})`;
            }
            chart.yAxis.max = data.yMax;
            chart.yAxis.min = data.yMin;
            result.chart = new Chart(chart);
            result.chart.ref$.toPromise().then(ref => {
              ref.xAxis[0].removePlotLine(undefined);
              ref.yAxis[0].setExtremes(data.yMin, data.yMax);
              data.plotLines.forEach(plotLine => {
                ref.xAxis[0].addPlotLine(plotLine);
              });
            });
            this.results.push(result);
            if (i === this.metadataGroups.length - 1) {
              this.isLoadingResults = false;
            }
          });
        })
        .catch(error => {
          if (error instanceof SyntaxError) {
            this.snackBar.open(
              'THERE WAS AN ISSUE PARSING THE DATA FILE',
              null,
              {
                duration: 2000
              }
            );
          } else {
            this.openSnackBar();
          }
          console.log(error);
          this.clear();
          if (i === this.metadataGroups.length - 1) {
            this.isLoadingResults = false;
          }
        });
    });
  }

  constructor(
    private rawService: RawDataService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private solr: SolrService
  ) {}

  clear() {
    this.results = [];
  }

  openSnackBar() {
    this.snackBar.openFromComponent(ErrorMessageComponent, {
      duration: 5000
    });
  }
}

@Component({
  selector: 'impc-error-message',
  template:
    '<h4 class="error">NOT WINDOWED RESULT FOUND FOR THE SELECTED INPUT</h4>',
  styles: [
    `
      .error {
        color: #ffab40ed;
        text-align: center;
        font-family: Roboto, 'Helvetica Neue', sans-serif;
      }
    `
  ]
})
export class ErrorMessageComponent {}
