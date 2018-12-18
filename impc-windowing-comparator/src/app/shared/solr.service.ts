import { excluded_ids } from './excluded-id.data';
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

  constructor(private http: HttpClient) {}

  private constructQuery(q: Array<Field>, target: string, pivot?: string) {
    let query = 'q=';
    let emptyField = false;
    q.forEach(field => {
      if (
        this.fieldNamesMap[field.name] === 'metadata_group' ||
        this.fieldNamesMap[field.name] === 'zygosity' ||
        this.fieldNamesMap[field.name] === 'phenotyping_center' ||
        !field.wildcard ||
        field.value === ''
      ) {
        field.name = this.fieldNamesMap[field.name];
      } else {
        field.name = this.fieldNamesMap[field.name] + '_ac';
      }
      field.value = field.value
        ? field.value.replace(/([\!\*\+\|\(\)\[\]\{\}\^\~\?\:\"\s])/g, '\\$1')
        : '';
      if (!field.value && !field.wildcard) {
        emptyField = true;
      }
      if (field.wildcard) {
        const preWildcard = !field.value ? '' : '*';
        if (pivot) {
          const idField = !field.value
            ? pivot.split(',')[0]
            : pivot.split(',')[0] + '_ac';
          const nameField = !field.value
            ? pivot.split(',')[1]
            : pivot.split(',')[1] + '_ac';
          query += `(${idField}:${preWildcard}${field.value}*`;
          query += ` OR ${nameField}:${preWildcard}${field.value}*)`;
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
    query = query.replace(/#/g, '%23');
    query = query.replace(/&/g, '%26');
    const fqs =
      '&fq=observation_type:unidimensional&fq=biological_sample_group:experimental';
    const options =
      '&rows=0&wt=json&facet=on&facet.mincount=1&facet.sort=index';
    const facet = pivot ? `&facet.pivot=${pivot}` : `&facet.field=${target}`;
    query += fqs + options + facet;
    if (!emptyField) {
      return query;
    }
    return false;
  }

  query(fields: Array<Field>, target, pivot?) {
    const solrFieldName = this.fieldNamesMap[target];
    const q = this.constructQuery(fields, solrFieldName, pivot);
    if (!q) {
      return new Observable<any>();
    }
    return this.http
      .get(environment.solrUrl + 'experiment/select?' + q)
      .pipe(
        map(
          x =>
            pivot
              ? this.parsePivotFacetResults(x, pivot)
              : this.parseSimpleFacetResult(x, solrFieldName)
        )
      );
  }

  parseSimpleFacetResult = (x, solrFieldName) =>
    x['facet_counts']['facet_fields'][solrFieldName].filter(
      doc => typeof doc === 'string' && doc !== ''
    )
  parsePivotFacetResults = (x, pivot) => {
    const parsedResults = [];
    x['facet_counts']['facet_pivot'][pivot].forEach(facetPivot => {
      const parsedResult = {};
      if (excluded_ids.indexOf(facetPivot['value']) < 0) {
        parsedResult['id'] = facetPivot['value'];
        parsedResult['name'] = facetPivot['pivot'][0]['value'];
        parsedResults.push(parsedResult);
      }
    });
    return parsedResults.sort((a, b) => a.name.localeCompare(b.name));
  }

  getParameterUnit(parameterID) {
    const q = `parameter_stable_id:${parameterID}`;
    const options = '&rows=1&wt=json';
    return this.http
      .get(environment.solrUrl + 'pipeline/select?q=' + q + options)
      .pipe(
        map(result => {
          return result['response']['docs'][0]['unit_x'];
        })
      );
  }

  getParameterName(parameterID) {
    const q = `parameter_stable_id:${parameterID}`;
    const options = '&rows=1&wt=json';
    return this.http
      .get(environment.solrUrl + 'experiment/select?q=' + q + options)
      .pipe(
        map(result => {
          return result['response']['docs'][0]['parameter_name'];
        })
      );
  }

  getProcedureName(procedureGroup) {
    const q = `procedure_group:${procedureGroup}`;
    const options = '&rows=1&wt=json';
    return this.http
      .get(environment.solrUrl + 'experiment/select?q=' + q + options)
      .pipe(
        map(result => {
          return result['response']['docs'][0]['procedure_name'];
        })
      );
  }
}
