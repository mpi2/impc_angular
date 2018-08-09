import { Component } from '@angular/core';

@Component({
  selector: 'impc-comparison-list',
  templateUrl: './comparison-list.component.html',
  styleUrls: ['./comparison-list.component.css']
})
export class ComparisonListComponent {

  comparisons = [ ];

  constructor() { }
}
