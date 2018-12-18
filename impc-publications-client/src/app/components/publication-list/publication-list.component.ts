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
  class = 'publication-list';

  private _status: string;
  private _filters = {};
  length = 10;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  @Input()
  isLoggedIn = false;

  publications: Promise<Publication[]>;

  constructor(private publicationsService: PublicationsService) {}

  ngOnInit() {
    const currentStatus = this._status !== 'pending';
    const falsePositiveStatus = this._status === 'falsePositive';
    this.publicationsService
      .getPublicationsNumber({
        reviewed: currentStatus,
        falsePositive: falsePositiveStatus
      })
      .then(publicationNumber => (this.length = publicationNumber));
    this.publications = this.publicationsService.getPublications(
      this.pageIndex,
      this.pageSize,
      { reviewed: currentStatus, falsePositive: falsePositiveStatus }
    );
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

  get status(): string {
    return this._status;
  }

  @Input()
  set filters(filters: Array<any>) {
    this._filters = {};
    filters.forEach(filter => {
      if (this._filters[filter['field']] === undefined) {
        this._filters[filter['field']] =
          typeof filter['option'] === 'string' ? [] : null;
      }
      if (typeof filter['option'] === 'string') {
        this._filters[filter['field']].push(filter['option']);
      } else {
        this._filters[filter['field']] = filter['option'];
      }
    });
    this.pageIndex = 0;
    this.reload();
  }

  get filter(): any {
    return this._filters;
  }

  reload() {
    this._filters['reviewed'] = this._status !== 'pending';
    this._filters['falsePositive'] = this._status === 'falsePositive';
    this.publicationsService
      .getPublicationsNumber(this._filters)
      .then(publicationNumber => (this.length = publicationNumber));
    this.publications = this.publicationsService.getPublications(
      this.pageIndex,
      this.pageSize,
      this._filters
    );
  }
}
