import { Component, Input } from '@angular/core';

@Component({
  selector: 'impc-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.css']
})
export class DiffComponent {

  @Input() value: number;
  @Input() exponential: number;

  constructor() { }
}
