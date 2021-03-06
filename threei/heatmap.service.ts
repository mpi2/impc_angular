/**
 * New typescript file
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  restDataBaseUrl = 'http://localhost:8080/data';
  restBaseUrl= 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getHeatmapResponse(heatmapType):
      Observable<HttpResponse<Response>> {
      console.log('calling heatmap service method');
      if(heatmapType=='procedure'){
      return this.http.get<Response>(
        this.restBaseUrl +'procedure_heatmap', { observe: 'response' });
      }
      if(heatmapType=='cell'){
        return this.http.get<Response>(
          this.restBaseUrl +'cell_heatmap', { observe: 'response' });
      }
      // if(heatmapType=='cell'){
      //   return this.http.get<Response>(
      //     this.restDataBaseUrl +'?heatmapType='+heatmapType, { observe: 'response' });
      // }
    }

    getCellTypeResponse():
      Observable<HttpResponse<Response>> {
      console.log('calling heatmap service method');
      
      return this.http.get<Response>(
        this.restBaseUrl +'/cellTypes', { observe: 'response' });
    }

    getCellSubTypeResponse():
    Observable<HttpResponse<Response>> {
    console.log('calling cellsubtype method');
    
    return this.http.get<Response>(
      this.restBaseUrl +'/cellSubTypes', { observe: 'response' });
  }

  getAssaysResponse():
    Observable<HttpResponse<Response>> {
    console.log('calling cellsubtype method');
    
    return this.http.get<Response>(
      this.restBaseUrl +'/assays', { observe: 'response' });
  }
    //get data from a file?
    // public getJSON(): Observable<any> {
    //   return this.http.get<any>('/assets/ProcedureHeatmapData.json');
    //                     // .catch((error:any) => console.log(error));
    //  }
}