import { PublicationsService } from './../shared/services/publications.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Publication } from '../shared/models/publication.model';


@Component({
  selector: 'impc-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {

  @HostBinding('class')
  class =  'publication-list';

  private _status: string;
  length = 10;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  publications: Promise<Publication[]>;

  constructor(private publicationsService: PublicationsService) {
  }

  ngOnInit() {
    this.publicationsService.getPublicationsNumber(this._status).then( publicationNumber => this.length = publicationNumber );
    this.publications = this.publicationsService.getPublications(this._status, 1, 5);
  }

  pageEvent(event) {
    this.publications = this.publicationsService.getPublications(this._status, event.pageIndex, event.pageSize);
  }

  @Input()
  set status(status) {
    this._status = status;
    this.publicationsService.getPublicationsNumber(this.status).then( publicationNumber => this.length = publicationNumber );
    this.publications = this.publicationsService.getPublications(this.status, 1, 5);
  }

  get status(): string {
    return this._status;
  }
}
