import { PublicationsService } from '../../shared/services/publications.service';
import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'impc-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.css']
})
export class StatusFilterComponent implements OnInit {

  @HostBinding('class')
  classes = 'filter';

  @Output()
  changeSelection = new EventEmitter();

  @Input()
  pending;

  @Input()
  reviewed;

  constructor() { }

  ngOnInit() {
  }

  change(event) {
    this.changeSelection.next(event);
  }

}
