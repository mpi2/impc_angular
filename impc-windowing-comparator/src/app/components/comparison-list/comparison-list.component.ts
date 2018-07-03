import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'impc-comparison-list',
  templateUrl: './comparison-list.component.html',
  styleUrls: ['./comparison-list.component.css']
})
export class ComparisonListComponent implements OnInit {

  comparisons = [ ];

  constructor() { }

  ngOnInit() { }

}
