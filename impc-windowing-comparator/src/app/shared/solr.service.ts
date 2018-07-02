import { environment } from './../../environments/environment';
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, retry, map} from 'rxjs/operators';
import { Observable } from 'rxjs';


export interface Field {
    name: string;
    value: string;
    wildcard: boolean;
}
@Injectable()
export class SolrService {

    fieldNamesMap = {
        center: 'phenotyping_center',
        colonyID: 'colony_id',
        zygosity: 'zygosity',
        procedureID: 'procedure_stable_id',
        procedureName: 'procedure_name',
        parameterID: 'parameter_stable_id',
        parameterName: 'parameter_name',
        metadata: 'metadata_group'
    };
    constructor(private http: HttpClient) { }

    private constructQuery(q: Array<Field>, target: string, pivot?: string) {
        let query = 'q=';
        let emptyField = false;
        q.forEach(field => {
            field.name = this.fieldNamesMap[field.name];
            field.value = field.value ? field.value.replace(/([\!\*\+\&\|\(\)\[\]\{\}\^\~\?\:\"])/g, '\\$1') : '';
            if (!field.value && !field.wildcard) { emptyField = true; }
            if (field.wildcard) {
                const preWildcard = !field.value ? '' : '*';
                query += `${field.name}:${preWildcard}${field.value}*`;
            } else {
                query += `${field.name}:"${field.value}"`;
            }
            query += ' AND ';
        });
        query = query.substring(0, query.length - 5);
        query = encodeURI(query);
        const options = '&rows=0&wt=json&facet=on&facet.mincount=1';
        const facet = pivot ? `&facet.pivot=${pivot}` : `&facet.field=${target}`;
        query += options + facet;
        if (!emptyField) { return query; }
        return false;
    }

    query(fields: Array<Field>, target, pivot?) {
        const solrFieldName = this.fieldNamesMap[target];
        const q = this.constructQuery(fields, solrFieldName, pivot);
        if (!q) { return new Observable<any>(); }
        return this.http.get(environment.solrUrl + 'experiment/select?' + q).pipe(
            map(x => pivot ? this.parsePivotFacetResults(x, pivot) : this.parseSimpleFacetResult(x, solrFieldName))
        );
    }

    parseSimpleFacetResult = (x, solrFieldName) => x['facet_counts']['facet_fields'][solrFieldName].filter(doc => typeof doc === 'string');
    parsePivotFacetResults = (x, pivot) => {
        const parsedResults = [];
        x['facet_counts']['facet_pivot'][pivot].forEach(facetPivot => {
            const parsedResult = {};
            parsedResult['id'] = facetPivot['value'];
            parsedResult['name'] = facetPivot['pivot'][0]['value'];
            parsedResults.push(parsedResult);
        });
        return parsedResults;
    }

    getParametrUnit(paramterID) {

    }
}
