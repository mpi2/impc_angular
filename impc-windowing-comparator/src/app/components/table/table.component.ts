import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'impc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() dataSource;

  @Input() title;

  @Input() pValue;

  @Input() pValueDiff = null;

  @Input() caption = null;

  displayedColumns = ['Category', 'Count', 'Mean', 'SD'];

  constructor() {}
}
