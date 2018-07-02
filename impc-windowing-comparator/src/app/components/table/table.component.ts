import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'impc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  dataSource;

  @Input()
  title;

  @Input()
  pValue;

  displayedColumns = ['Category', 'Count', 'Mean', 'SD'];

  constructor() { }

  ngOnInit() {
  }

}
