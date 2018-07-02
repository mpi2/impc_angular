import { environment } from './../../environments/environment';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LEAVE_CLASSNAME } from '@angular/animations/browser/src/util';

@Injectable({
  providedIn: 'root'
})
export class RawDataService {
  seriesTemplate = [
    {
      type: 'scatter',
      name: 'Female WT',
      data: []
    },
    {
      type: 'scatter',
      name: 'Male WT',
      data: []
    },
    {
      type: 'scatter',
      name: 'Female',
      data: []
    },
    {
      type: 'scatter',
      name: 'Male',
      data: []
    },
    {
      type: 'line',
      name: 'Window',
      dashStyle: 'ShortDashDot',
      data: [],
      lineWidth: 3,
      marker: {
        enabled: false
      },
      states: {
        hover: {
          lineWidth: 0
        }
      },
    },
  ];

  zygosityMap = {
    homozygote: 'HOM',
    hemizygote: 'HEM',
    heterozygote: 'HET'
  };

  lineTemplate =     {
    color: '#ccc4c4', // Red
    width: 2,
    dashStyle: 'ShortDot'
  };

  plotLines = [ ];

  constructor(private http: HttpClient) { }

  /*getRawData(phenotypingCenter, parameterId, allelleId, strainId, pipelineId, zygosity, window) {
    const reqURL = `https://dev.mousephenotype.org/data/exportraw?phenotyping_center=
    ${phenotypingCenter}&parameter_stable_id=${parameterId}&allele_accession_id=${allelleId}
    &strain=${strainId}&pipeline_stable_id=${pipelineId}&zygosity=${zygosity}`;
    return this.http.get(reqURL, {responseType: 'text'}).toPromise().then(csv => {
      const lines = this.CSVToArray(csv);
      const header = lines[0];
      lines.shift();
      const dates = [];
      lines.forEach(line => {
        const dateStr = line[header.indexOf('Assay.Date')];
        const dateArray = dateStr.split('-');
        const value = line[header.indexOf('Value')];
        const point = [Date.UTC(dateArray[0], dateArray[1], dateArray[2]), parseFloat(value)];
        const sex = line[header.indexOf('Sex')];
        const biologicalSampleGroup = line[header.indexOf('biological_sample_group')];
        if (sex === 'female' && biologicalSampleGroup === 'control') { this.seriesTemplate[0].data.push(point); }
        if (sex === 'male' && biologicalSampleGroup === 'control') { this.seriesTemplate[1].data.push(point); }
        if (sex === 'female' && biologicalSampleGroup === 'experimental') { this.seriesTemplate[2].data.push(point); }
        if (sex === 'male' && biologicalSampleGroup === 'experimental') { this.seriesTemplate[3].data.push(point); }
      });
      return this.seriesTemplate;
    });
  }*/

  getWindowData(phenotypingCenter, colonyID, zygosity, procedure, parameter, metadataGroup) {
    const fileName = 'output_Successful.tsv';
    const rawFileName = 'output_rawData.csv';
    procedure = procedure.substring(0, procedure.lastIndexOf('_'));
    this.seriesTemplate.forEach(serie => serie.data = []);
    this.plotLines = [];
    let baseUrl = `${environment.baseUrl}/data/${phenotypingCenter.replace(new RegExp(' ', 'g'), '_')}/`;
    baseUrl += `${colonyID.replace(new RegExp('-', 'g'), '_')}/${zygosity}/${procedure}/${parameter}/${metadataGroup}/`;
    const fileUrl = baseUrl + fileName;
    const rawLink = baseUrl + rawFileName;
    this.seriesTemplate[2].name = 'Female ' + this.zygosityMap[zygosity];
    this.seriesTemplate[3].name = 'Male ' + this.zygosityMap[zygosity];
    return this.http.post(fileUrl, {}, {responseType: 'text'}).toPromise().then( response => {
      const responseArray = response.split('\t');
      const processed = responseArray[0] !== 'NotProcessed';
      const result = JSON.parse(responseArray[14])['result'];
      console.log(result);
      const portalLink = result['detail']['gene_page_url'];
      let oldPValue = 1;
      let newPValue = 1;
      let window = [];
      const oldData = [];
      const newData = [];
      if (processed) {
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
        }));
        oldPValue = result['vectoroutput']['normal_result']['genotype_p_val'];
        newPValue = result['vectoroutput']['windowed_result']['genotype_p_val'];
        window = result['detail']['window_parameters']['weights'];
      }
      const values = result['detail']['original_response'];
      const dates = result['detail']['original_date_of_experiment'];
      const sampleGroups = result['detail']['original_biological_sample_group'];
      const sexes = result['detail']['original_sex'];
      const max = Math.max(...values);
      for (let index = 0; index < values.length; index++) {
        const value = values[index];
        const dateStr = dates[index];
        const dateArray = dateStr.split('T')[0].split('-');
        const point = [Date.UTC(dateArray[0], dateArray[1], dateArray[2]), value];
        const sex = sexes[index];
        const biologicalSampleGroup = sampleGroups[index];
        const widowPoint = [Date.UTC(dateArray[0], dateArray[1], dateArray[2]), window[index] * max];
        if (sex === 'female' && biologicalSampleGroup === 'control') { this.seriesTemplate[0].data.push(point); }
        if (sex === 'male' && biologicalSampleGroup === 'control') { this.seriesTemplate[1].data.push(point); }
        if (sex === 'female' && biologicalSampleGroup === 'experimental') { this.seriesTemplate[2].data.push(point); }
        if (sex === 'male' && biologicalSampleGroup === 'experimental') { this.seriesTemplate[3].data.push(point); }
        if (biologicalSampleGroup === 'control' && processed) { this.seriesTemplate[4].data.push(widowPoint); }
        if (biologicalSampleGroup === 'experimental' && processed) {
          const plotLine = Object.assign({}, this.lineTemplate);
          plotLine['value'] = Date.UTC(dateArray[0], dateArray[1], dateArray[2]);
          this.plotLines.push(plotLine);
        }
      }
      return {
        series: this.seriesTemplate,
        plotLines: this.plotLines,
        oldData: oldData,
        newData: newData,
        oldPValue: oldPValue,
        newPvalue: newPValue,
        rawLink: rawLink,
        portalLink: portalLink
      };
    });
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
}
