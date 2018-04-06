import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators/map';


@Injectable()
export class AlleleAutocompleteService {

  public static allAlleles: Observable<any> = null;

  constructor(private http: HttpClient) { }

  getAlleles(text): Observable<any> {
    const requestUrl = environment.impcAlleleApiUrl + '/' + text ;
    if (text !== '') {
      return this.http.get(requestUrl);
    } else if (!!AlleleAutocompleteService.allAlleles) {
      return AlleleAutocompleteService.allAlleles;
    } else {
      AlleleAutocompleteService.allAlleles = this.http.get(requestUrl);
      return AlleleAutocompleteService.allAlleles;
    }
  }

}
