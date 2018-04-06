import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'impc-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.css']
})
export class FacetsComponent implements OnInit {

  @HostBinding()
  class = 'impc-facets';

  constructor() { }

  ngOnInit() {
  }

}
