import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

export interface ImagesResponse {
    start: string;
    numFound: string;
  }
@Injectable()
export class ImagesRestService {

    restBaseUrl = 'http://localhost:8080/SimpleProxyServer/?';



getImagesResponse(queryString= '*:*', rows= 10, selectedParameterName?: string, selectedProcedureName?: string): Observable<HttpResponse<Response>> {
    console.log('selected parameter name in rest request=' + selectedParameterName);
    let query = 'q=' + queryString;
    query += '&rows=' + String(rows);
    if(selectedParameterName){
    query += '&fq=parameter_name:' + '"' + selectedParameterName + '"';
    }
    if(selectedProcedureName){
        query += '&fq=procedure_name:' + '"' + selectedProcedureName + '"';
    }
    return this.http.get<Response>(
      this.restBaseUrl + query, { observe: 'response' });
  }

getPossibleProceduresResponse(): Observable<HttpResponse<Response>> {
    // tslint:disable-next-line:max-line-length
    // http://wwwdev.ebi.ac.uk/mi/impc/dev/solr/impc_images/select/?q=*:*&facet=true&facet.limit=-1&facet.field=parameter_stable_id&rows=0&wt=json
    const query = 'q=*:*&facet=true&facet.limit=-1&facet.field=procedure_name&rows=0';
    return this.http.get<Response>(
      this.restBaseUrl + query, { observe: 'response' });
  }

  getPossibleParametersResponse(): Observable<HttpResponse<Response>> {
    // tslint:disable-next-line:max-line-length
    // http://wwwdev.ebi.ac.uk/mi/impc/dev/solr/impc_images/select/?q=*:*&facet=true&facet.limit=-1&facet.field=parameter_stable_id&rows=0&wt=json
    const query = 'q=*:*&facet=true&facet.limit=-1&facet.field=parameter_name&rows=0';
    return this.http.get<Response>(
      this.restBaseUrl + query, { observe: 'response' });
  }

 constructor(private http: HttpClient) { }

}
