import { RawDataService } from './../../shared/raw-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { first, map } from '../../../../node_modules/rxjs/operators';

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
    this._chartData.ref$.toPromise().then(ref => ref.series.forEach(serie => serie.show()));
  }

  @Input()
  oldData: any;

  @Input()
  newData: any;

  @Input()
  oldPValue;

  @Input()
  newPValue;

  @Input()
  method;

constructor() {}

ngOnInit() { }


}
