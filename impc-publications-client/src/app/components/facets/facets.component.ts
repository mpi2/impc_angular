import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'impc-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.css']
})
export class FacetsComponent implements OnInit {

  @HostBinding()
  class = 'impc-facets';

  @Output()
  changeSelection = new EventEmitter();

  @Input()
  facets = [];

  selection: any;
  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

  change(event) {
    console.log(this.selection);
    this.changeSelection.next(this.selection);
  }

}
