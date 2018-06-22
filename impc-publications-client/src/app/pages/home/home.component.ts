import { PublicationsService } from './../../shared/services/publications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'impc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentStatus = false;
  toggleFilterIcon = 'filter_list';
  currentFilters = [];

  pendingNumber = 0;
  reviewedNumber = 0;

  facets = [
    {
      section: 'keyword',
      options: ['EUCOMM', 'IMPC', 'KOMP']
    }
  ];

  constructor(private publicationService: PublicationsService) {
    this.publicationService.getPublicationsNumber(false).then(count => this.pendingNumber = count);
    this.publicationService.getPublicationsNumber(true).then(count => this.reviewedNumber = count);
  }

  ngOnInit() {
    this.publicationService.countChanged.subscribe( count => {
      count['pending'].then(value => this.pendingNumber = value);
      count['reviewed'].then(value => this.reviewedNumber = value);
    }
  );
}

changeStatus(status) {
  this.currentStatus = status;
}

changeFilter(filter) {
  this.currentFilters = filter;
}

}
