import { FragmentsService } from './fragments.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PublicationsService {

  constructor(private http: HttpClient, private fragments: FragmentsService) { }

  getPublications(status = 'all', page = 1, size = 20): Promise<any> {
    const query = `page=${page}&size=${size}`;
    let requestUrl = environment.impcPublicationsApiUrl;
    if (status === 'all') {
      requestUrl += '?' + query;
    } else {
      requestUrl += '/search/findByReviewed?' + query + `&reviewed=${status}`;
    }
    return this.http.get(requestUrl).toPromise()
    .then(response => response['_embedded']['publications']
    .map(publication => {
      publication['alleles'] = publication['symbol'].split('|||').filter(n => n);
      publication['authors'] = publication['author'];
      publication['url'] = publication['paperUrl'].split('|||')[0];
      publication['keywords'] = this.fragments.getFragments(publication['pmid']);
      publication['citesPmid'] = publication['citesPmid'] ? `http://europepmc.org/abstract/MED/${publication['citesPmid']}` : false;
      return publication;
    }));
  }

  getPublicationsNumber(status = 'all') {
    const query = `page=1&size=1`;
    let requestUrl = environment.impcPublicationsApiUrl;
    if (status === 'all') {
      requestUrl += '?' + query;
    } else {
      requestUrl += '/search/findByReviewed?' + query + `&reviewed=${status}`;
    }
    return this.http.get(requestUrl).toPromise()
    .then(response => response['page']['totalElements']);
  }

}
