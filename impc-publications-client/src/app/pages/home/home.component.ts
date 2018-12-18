import { AuthService } from './../../shared/services/auth.service';
import { PublicationsService } from './../../shared/services/publications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'impc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentStatus = 'pending';
  toggleFilterIcon = 'filter_list';
  currentFilters = [];

  pendingNumber = 0;
  reviewedNumber = 0;
  falsePositiveNumber = 0;
  isLoggedIn = false;

  facets = [
    {
      field: 'keywords',
      title: 'Keywords',
      options: ['EUCOMM', 'IMPC', 'KOMP']
    },
    {
      field: 'consortiumPaper',
      title: 'Is Consortium Paper',
    },
    {
      field: 'alleles',
      title: 'Has Alleles',
    },
    {
      field: 'cites',
      title: 'Cites consortium paper',
    }
  ];

  constructor(private publicationService: PublicationsService, public auth: AuthService ) {
    this.publicationService.getPublicationsNumber({reviewed: false}).then(count => this.pendingNumber = count);
    this.publicationService.getPublicationsNumber({reviewed: true, falsePositive: false}).then(count => this.reviewedNumber = count);
    this.publicationService.getPublicationsNumber({falsePositive: true}).then(count => this.falsePositiveNumber = count);
    this.isLoggedIn = auth.isLoggedIn();
  }

  ngOnInit() {
    this.publicationService.countChanged.subscribe( count => {
      count['pending'].then(value => this.pendingNumber = value);
      count['falsePsotive'].then(value => this.falsePositiveNumber = value);
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
