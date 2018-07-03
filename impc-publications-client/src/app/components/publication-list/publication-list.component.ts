import { PublicationsService } from '../../shared/services/publications.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Publication } from '../../shared/models/publication.model';


@Component({
  selector: 'impc-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {

  @HostBinding('class')
  class =  'publication-list';

  private _status: boolean;
  private _filters = {};
  length = 10;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;

  publications: Promise<Publication[]>;

  constructor(private publicationsService: PublicationsService) {
  }

  ngOnInit() {
    this.publicationsService.getPublicationsNumber(this._status).then( publicationNumber => this.length = publicationNumber );
    this.publications = this.publicationsService.getPublications(this.pageIndex, this.pageSize, {reviewed: this._status});
    this.publicationsService.countChanged.subscribe(value => this.reload());
  }
  pageEvent(event) {
    this.pageSize = event['pageSize'];
    this.pageIndex = event['pageIndex'];
    this.reload();
  }

  @Input()
  set status(status) {
    this._status = status;
    this.pageIndex = 0;
    this.reload();
  }

  get status(): boolean {
    return this._status;
  }

  @Input()
  set filters(filters: Array<any>) {
    this._filters = {};
    filters.forEach( filter => {
      if (this._filters[filter['section']] === undefined) {
        this._filters[filter['section']] = [];
      }
      this._filters[filter['section']].push(filter['option']);
    });
    this.reload();
  }

  get filter(): any {
    return this._filters;
  }

  reload() {
    this._filters['reviewed'] = this._status;
    this.publicationsService.getPublicationsNumber(this._status).then( publicationNumber => this.length = publicationNumber );
    this.publications = this.publicationsService.getPublications(this.pageIndex, this.pageSize, this._filters);
  }
}
