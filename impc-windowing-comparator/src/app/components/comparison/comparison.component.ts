import { RawDataService } from './../../shared/raw-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'impc-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  @Input()
  chartData: any;

  @Input()
  oldData: any;

  @Input()
  newData: any;

  @Input()
  oldPValue;

  @Input()
  newPValue;

constructor() {}

ngOnInit() { }


}
