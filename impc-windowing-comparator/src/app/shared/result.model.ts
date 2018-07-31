import { Chart } from 'angular-highcharts';

export class Result {
    chart: Chart;
    oldData: any;
    newData: any;
    oldPValue: any;
    newPValue: any;
    rawLink: string;
    portalLink: string;
    resultsLink: string;
    method: string;
    yMax: number;
    yMin: number;
}
