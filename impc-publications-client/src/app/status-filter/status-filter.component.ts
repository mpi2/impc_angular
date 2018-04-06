import { PublicationsService } from './../shared/services/publications.service';
import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';

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

  pending = 0;
  reviewed = 0;
  all = 0;

  constructor(private publicationsService: PublicationsService) {
    this.publicationsService.getPublicationsNumber().then(count => this.all = count);
    this.publicationsService.getPublicationsNumber('no').then(count => this.pending = count);
    this.publicationsService.getPublicationsNumber('yes').then(count => this.reviewed = count);
  }

  ngOnInit() {
  }

  change(event) {
    this.changeSelection.next(event);
  }

}
