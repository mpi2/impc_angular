import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { ProcedureFilter } from './procedure-heatmap/procedure-filter';
import { CellFilter } from './cell-heatmap/cell-filter';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  restDataBaseUrl = 'http://localhost:8080/data';
  restBaseUrl= 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getCellHeatmapResponse(filter: CellFilter):
      Observable<HttpResponse<Response>> {
      console.log('calling heatmap service method');
      
      if(filter){
        console.log('query button clicked with search='+filter.searchText+' constructSeleted '+filter.construct+' cell selected='+filter.cellType+' cellSubtypeSelected='+filter.cellSubType);

      }
        return this.http.get<Response>(
          this.restBaseUrl +'cell_heatmap', { observe: 'response' });
    }

    getProcedureHeatmapResponse(filter: ProcedureFilter):
      Observable<HttpResponse<Response>> {
      console.log('calling procedure heatmap service method');
      
      return this.http.get<Response>(
        this.restBaseUrl +'procedure_heatmap', { observe: 'response' });
    }

    getCellTypeResponse():
      Observable<HttpResponse<Response>> {
      //console.log('calling heatmap service method');
      
      return this.http.get<Response>(
        this.restBaseUrl +'/cellTypes', { observe: 'response' });
    }

    getCellSubTypeResponse():
    Observable<HttpResponse<Response>> {
    //console.log('calling cellsubtype method');
    
    return this.http.get<Response>(
      this.restBaseUrl +'/cellSubTypes', { observe: 'response' });
  }

  getAssaysResponse():
    Observable<HttpResponse<Response>> {
    console.log('calling cellsubtype method');
    
    return this.http.get<Response>(
      this.restBaseUrl +'/assays', { observe: 'response' });
  }
   
}
