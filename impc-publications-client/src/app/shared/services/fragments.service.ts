import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FragmentsService {

  constructor(private http: HttpClient) { }

  getFragments(pmid) {
    const requestUrl = environment.impcFragmentsApiUrl + '/' + pmid ;
    return this.http.get(requestUrl).toPromise()
    .then(response => (response !== null) ? response['fragments'] : []);
  }

}
