import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'impc-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {

  @Input()
  number: number;

  constructor() { }

  ngOnInit() {
  }

}
