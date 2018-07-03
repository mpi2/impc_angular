import { SolrService } from './../../shared/solr.service';
import { Chart } from 'angular-highcharts';
import { Component, OnInit } from '@angular/core';
import { RawDataService } from '../../shared/raw-data.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'impc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chartData = {
    chart: {
      type: 'scatter',
      zoomType: 'x'
    },
    title: {
      text: 'Scatter plot'
    },
    credits: {
      enabled: false
    },
    series: [ ],
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
    }
  }
};

  chart: Chart;
  oldData: any;
  newData: any;
  oldPValue: any;
  newPValue: any;
  rawLink: string;
  portalLink: string;

updateChart(value) {
  const procedureName = value.procedure.split(' | ')[0];
  const parameterName = value.parameter.split(' | ')[0];
  const procedureID = value.procedure.split(' | ')[1];
  const parameterID = value.parameter.split(' | ')[1];
  this.rawService.getWindowData(value.center, value.colonyID, value.zygosity, procedureID, parameterID, value.metadata).then(
    data => {
      this.oldData = data.oldData;
      this.newData = data.newData;
      this.oldPValue = data.oldPValue;
      this.newPValue = data.newPvalue;
      this.rawLink = data.rawLink;
      this.portalLink = data.portalLink;

      this.chartData.series = [];
      data.series.forEach(serie => {
        this.chartData.series.push(serie);
      });
      this.chartData.xAxis.plotLines = [];
      data.plotLines.forEach(plotLine => {
        this.chartData.xAxis.plotLines.push(plotLine);
      });
      this.chartData.title.text = procedureName + ': ' + parameterName;
      this.solr.getParametrUnit(parameterID).subscribe(unit => {
        this.chartData.yAxis.title.text = parameterName;
        if (unit !== ' ') {
          this.chartData.yAxis.title.text += ` (${unit})`;
        }
        this.chart = new Chart(this.chartData);
      });
    }
  ).catch(error => {
    console.log(error);
    this.openSnackBar();
    this.clear();
  });
}

  constructor(private rawService: RawDataService, private route: ActivatedRoute, public snackBar: MatSnackBar, private solr: SolrService) {

  }

  ngOnInit() {

  }

  clear() {
    this.chart = null;
  }

  openSnackBar() {
    this.snackBar.openFromComponent(ErrorMessageComponent, {
      duration: 3000,
    });
  }

}

@Component({
  selector: 'impc-error-message',
  template: '<h4 class="error">NOT WINDOWED RESULT FOUND FOR THE SELECTED INPUT</h4>',
  styles: [`
    .error {
      color: #ffab40ed;
      text-align: center;
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }
  `],
})
export class ErrorMessageComponent {

}
