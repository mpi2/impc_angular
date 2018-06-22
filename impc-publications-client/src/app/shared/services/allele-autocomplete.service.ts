import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators/map';


@Injectable()
export class AlleleAutocompleteService {

  allAlleles: Observable<any> = null;

  constructor(private http: HttpClient) { }

  getAlleles(text): Observable<any> {
    const requestUrl = environment.impcAlleleApiUrl + '/' + text ;
    if (text !== '') {
      return this.http.get(requestUrl).pipe(map(response => response['content']));
    } else if (this.allAlleles !== null) {
      return this.allAlleles.pipe(map(response => response['content']));
    } else {
      this.allAlleles = this.http.get(requestUrl);
      return this.allAlleles.pipe(map(response => response['content']));
    }
  }

}
