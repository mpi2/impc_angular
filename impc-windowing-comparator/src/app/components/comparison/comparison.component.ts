import { Result } from './../../shared/result.model';
import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'impc-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  private _chartData: Chart;

  get chartData(): Chart {
    return this._chartData;
  }

  @Input()
  set chartData(chart: Chart) {
    this._chartData = chart;
    this._chartData.ref$
      .toPromise()
      .then(ref => ref.series.forEach(serie => serie.show()));
  }

  @Input() result: Result;

  pValueDiff: number;

  constructor() {}

  ngOnInit() {
    this.pValueDiff = this.result.newPValue - this.result.oldPValue;
  }
}
