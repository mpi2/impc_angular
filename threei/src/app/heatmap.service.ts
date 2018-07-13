import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  restBaseUrl = 'http://localhost:8080/data';
  constructor(private http: HttpClient) { }

  getHeatmapResponse(heatmapType):
      Observable<HttpResponse<Response>> {
      console.log('calling heatmap service method');
      
      return this.http.get<Response>(
        this.restBaseUrl +'?heatmapType='+heatmapType, { observe: 'response' });
    }
    //get data from a file?
    // public getJSON(): Observable<any> {
    //   return this.http.get<any>('/assets/ProcedureHeatmapData.json');
    //                     // .catch((error:any) => console.log(error));

    //  }
}
