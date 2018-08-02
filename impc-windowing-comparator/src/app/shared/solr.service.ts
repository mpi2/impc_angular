import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
        procedureID: 'procedure_group',
        procedureName: 'procedure_name',
        parameterID: 'parameter_stable_id',
        parameterName: 'parameter_name',
        metadata: 'metadata_group',
        alleleSymbol: 'allele_symbol'
    };
    constructor(private http: HttpClient) { }

    private constructQuery(q: Array<Field>, target: string, pivot?: string) {
        let query = 'q=';
        let emptyField = false;
        q.forEach(field => {
            field.name = this.fieldNamesMap[field.name];
            field.value = field.value ? field.value.replace(/([\!\*\+\&\|\(\)\[\]\{\}\^\~\?\:\"\s])/g, '\\$1') : '';
            if (!field.value && !field.wildcard) { emptyField = true; }
            if (field.wildcard) {
                const preWildcard = !field.value ? '' : '*';
                if (pivot) {
                    query += `(${pivot.split(',')[0]}:${preWildcard}${field.value}*`;
                    query += ` OR ${pivot.split(',')[1]}:${preWildcard}${field.value}*)`;
                } else {
                    query += `${field.name}:${preWildcard}${field.value}*`;
                }
            } else {
                query += `${field.name}:"${field.value}"`;
            }
            query += ' AND ';
        });
        query = query.substring(0, query.length - 5);
        query = encodeURI(query);
        const fqs = '&fq=datasource_name:IMPC&fq=observation_type:unidimensional&fq=biological_sample_group:experimental';
        const options = '&rows=0&wt=json&facet=on&facet.mincount=1&facet.sort=index';
        const facet = pivot ? `&facet.pivot=${pivot}` : `&facet.field=${target}`;
        query += fqs + options + facet;
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

    parseSimpleFacetResult = (x, solrFieldName) => x['facet_counts']['facet_fields'][solrFieldName]
                             .filter(doc => typeof doc === 'string' && doc !== '')
    parsePivotFacetResults = (x, pivot) => {
        const parsedResults = [];
        x['facet_counts']['facet_pivot'][pivot].forEach(facetPivot => {
            const parsedResult = {};
            parsedResult['id'] = facetPivot['value'];
            parsedResult['name'] = facetPivot['pivot'][0]['value'];
            parsedResults.push(parsedResult);
        });
        return parsedResults.sort((a, b) => a.name.localeCompare(b.name));
    }

    getParametrUnit(parameterID) {
        const q = `parameter_stable_id:${parameterID}`;
        const options = '&rows=1&wt=json';
        return this.http.get(environment.solrUrl + 'pipeline/select?q=' + q + options).pipe(
            map(result => {
                return result['response']['docs'][0]['unit_x'];
            })
        );
    }
}
