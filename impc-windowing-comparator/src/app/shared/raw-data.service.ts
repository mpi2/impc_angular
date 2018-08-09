import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

class Series {
  type: string;
  name: string;
  marker: any;
  color: string;
  data = [];
}
class LineSeries extends Series {
  dashStyle: string;
  states: any;
}

@Injectable({
  providedIn: 'root'
})
export class RawDataService {
  zygosityMap = {
    homozygote: 'HOM',
    hemizygote: 'HEM',
    heterozygote: 'HET'
  };

  possibleNotProcessedReasons = {
    'both_mut_and_control': 'Both mutants and control',
    'empty_dataset': 'Empty dataset',
    'empty_response': 'Empty response',
    'is_exception': 'Is exception',
    'min_onbs_in_each_group': 'Minimium observation in each group',
    'the_num_colonies': 'Number of colonies',
    'variation_in_respone': 'Variaton in response'
  };

  constructor(private http: HttpClient) { }

  getWindowData(phenotypingCenter, colonyID, zygosity, procedure, parameter, metadataGroup) {
    const fileName = 'output_Successful.tsv';
    const rawFileName = 'output_rawData.csv';
    let baseUrl = `${environment.dataBaseUrl}/${phenotypingCenter.replace(new RegExp(' ', 'g'), '_')}/`;
    baseUrl += `${procedure.replace(new RegExp('[^a-zA-Z0-9]', 'g'), '_')}/`;
    baseUrl += `${parameter.replace(new RegExp('[^a-zA-Z0-9]', 'g'), '_')}/`;
    baseUrl += `${colonyID.replace(new RegExp('[^a-zA-Z0-9]', 'g'), '_')}/${zygosity}/${metadataGroup}/`;
    const fileUrl = baseUrl + fileName;
    const rawLink = baseUrl + rawFileName;
    return this.http.post(fileUrl, {}, {responseType: 'text'})
    .toPromise()
    .then(response => this.parseResponse(response, zygosity, fileUrl, rawLink))
    .catch(error => this.http.post(fileUrl.replace('Successful', 'NotProcessed'), {},
                                  {responseType: 'text'}).toPromise()
    .then(response => this.parseResponse(response, zygosity, fileUrl.replace('Successful', 'NotProcessed'), rawLink)));
  }

  CSVToArray( strData, strDelimiter? ) {
    strDelimiter = (strDelimiter || ',');

    const objPattern = new RegExp(
      (
        '(\\' + strDelimiter + '|\\r?\\n|\\r|^)' +
        '(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|' +
        '([^\"\\' + strDelimiter + '\\r\\n]*))'
      ),
      'gi'
    );

    const arrData = [[]];
    let arrMatches = null;

    while (arrMatches = objPattern.exec( strData )) {
      const strMatchedDelimiter = arrMatches[ 1 ];
      if (
        strMatchedDelimiter.length &&
        strMatchedDelimiter !== strDelimiter
      ) {
        arrData.push( [] );
      }
      let strMatchedValue;
      if (arrMatches[ 2 ]) {
        strMatchedValue = arrMatches[ 2 ].replace(
          new RegExp( '\"\"', 'g' ),
          '\"'
        );
      } else {
        strMatchedValue = arrMatches[ 3 ];
      }
      arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    return( arrData );
  }

  getSeries(seriesName: string) {
    let series = null;
    if (seriesName.indexOf('Window') >= 0) {
      series = new LineSeries();
      series.type = 'line';
      series.dashStyle = 'ShortDashDot';
      series.lineWidth = 2.5;
      series.marker = { enabled: false };
      series.color = 'rgb(82,86,89, 0.8)';
      series.states = {
        hover: {
          lineWidth: 0
        }
      };
    } else {
      series = new Series();
      series.type = 'scatter';
      series.marker = {};
      if (seriesName.indexOf('Male') >= 0) {
        series.marker.symbol = 'triangle';
        series.marker.lineWidth = 1;
        series.marker.lineColor = null;
      } else {
        series.marker.symbol = 'circle';
        series.marker.lineWidth = 2;
        series.marker.lineColor = null;
      }
      if (seriesName.indexOf('WT') >= 0) {
        series.color = 'rgba(239, 123, 11, 0.25)';
      } else {
        series.color = 'rgba(9, 120, 161, 0.6)';
      }
    }
    series.name = seriesName;
    return series;
  }

  parseResponse(response, zygosity, fileUrl, rawLink) {
    const series = [];
    series.push(this.getSeries('Female WT'));
    series.push(this.getSeries('Male WT'));
    series.push(this.getSeries('Female ' + this.zygosityMap[zygosity]));
    series.push(this.getSeries('Male ' + this.zygosityMap[zygosity]));
    series.push(this.getSeries('Window'));
    const responseArray = response.split('\t');
    const processed = responseArray[0] !== 'NotProcessed';
    const jsonStr = responseArray[14];/*.replace(':NA', ':"NA"')
    .replace(new RegExp('Male: "NA""', 'g'), 'Male: NA"')
    .replace(new RegExp('Female: "NA",', 'g'), 'Female: NA,')
    .replace('"(>1): FALSE: "NA""', '"(>1): FALSE: NA"');*/
    const result = JSON.parse(jsonStr)['result'];
    console.log(result);
    const portalLink = result['detail']['gene_page_url'];
    const resultsLink = fileUrl;
    let oldPValue = 0;
    let newPValue = 0;
    let window = [];
    const oldData = [];
    const newData = [];
    const notProcessedReasons = [];
    let method = '';
    if (result['vectoroutput']['normal_result'] !== undefined) {
      method = result['vectoroutput']['normal_result']['method'];
    } else {
      method = '';
    }
    if (!processed) {
      Object.keys(this.possibleNotProcessedReasons).forEach(key =>
        notProcessedReasons.push(`${this.possibleNotProcessedReasons[key]} = ${result['detail'][key]}`)
      );
    } else if (!!result['vectoroutput']['windowed_result']['additional_information']) {
      const oldDataObj = result['vectoroutput']['normal_result']['additional_information']['summary_statistics'];
      const newDataObj = result['vectoroutput']['windowed_result']['additional_information']['summary_statistics'];
      Object.keys(oldDataObj).forEach(key => oldData.push({
        category: key,
        count: oldDataObj[key]['count'],
        mean: oldDataObj[key]['mean'],
        sd: oldDataObj[key]['sd'],
      }));
      Object.keys(newDataObj).forEach(key => newData.push({
        category: key,
        count: newDataObj[key]['count'],
        mean: newDataObj[key]['mean'],
        sd: newDataObj[key]['sd'],
        diff: {
          count: newDataObj[key]['count'] - oldDataObj[key]['count'],
          mean: newDataObj[key]['mean'] - oldDataObj[key]['mean'],
          sd: newDataObj[key]['sd'] - oldDataObj[key]['sd']
        }
      }));
      oldPValue = result['vectoroutput']['normal_result']['genotype_contribution'];
      newPValue = result['vectoroutput']['windowed_result']['genotype_contribution'];
      window = result['detail']['window_parameters']['weights'];
    }
    const phenlist_data_spec_ids = result['detail']['phenlist_data_spec_Ids'];
    const original_external_sample_ids = result['detail']['original_external_sample_id'];
    let values = result['detail']['original_response'];
    let dates = result['detail']['original_date_of_experiment'];
    let sampleGroups = result['detail']['original_biological_sample_group'];
    let sexes = result['detail']['original_sex'];
    if (phenlist_data_spec_ids && original_external_sample_ids.length > phenlist_data_spec_ids.length) {
      const filterIndexes = [];
      original_external_sample_ids.forEach((id, index) => {
        if (phenlist_data_spec_ids.indexOf(id) > -1) {
          filterIndexes.push(index);
        }
      });
      values = values.filter((_, index) => filterIndexes.includes(index));
      dates = dates.filter((_, index) => filterIndexes.includes(index));
      sampleGroups = sampleGroups.filter((_, index) => filterIndexes.includes(index));
      sexes = sexes.filter((_, index) => filterIndexes.includes(index));
    }
    const max = Math.max(...values);
    const min = Math.min(...values);
    dates = dates.map(dateStr => {
      const dateArray = dateStr.split('T')[0].split('-');
      const date = Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2]);
      return date;
    });
    const plotLines = [];
    for (let index = 0; index < values.length; index++) {
      const value = values[index];
      const date = dates[index];
      const point = [date, value];
      const sex = sexes[index];
      const biologicalSampleGroup = sampleGroups[index];
      if (sex === 'female' && biologicalSampleGroup === 'control') { series[0].data.push(point); }
      if (sex === 'male' && biologicalSampleGroup === 'control') { series[1].data.push(point); }
      if (sex === 'female' && biologicalSampleGroup === 'experimental') { series[2].data.push(point); }
      if (sex === 'male' && biologicalSampleGroup === 'experimental') { series[3].data.push(point); }
      if (biologicalSampleGroup === 'experimental') {
        const plotLine = {
          color: '#ccc4c4',
          width: 2,
          dashStyle: 'ShortDot',
          value: date
        };
        plotLines.push(plotLine);
      }
    }
    dates.sort((a, b) => {
      return a - b;
    });
    if (processed) {
      dates.forEach((date, index) => {
        const weigth = window[index];
        const windowY = (max - min) * weigth + min;
        const windowPoint = [date, windowY];
        series[4].data.push(windowPoint);
      });
    }
    return {
      series: series.filter(s => s.data.length > 0),
      plotLines: plotLines,
      oldData: oldData,
      newData: newData,
      oldPValue: oldPValue,
      newPvalue: newPValue,
      rawLink: rawLink,
      portalLink: portalLink,
      method: method,
      resultsLink: resultsLink,
      yMax: max,
      yMin: min,
      notProcessedReasons: notProcessedReasons
    };
  }
}
