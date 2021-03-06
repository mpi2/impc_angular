import { Chart } from 'angular-highcharts';

export class Result {
    chart: Chart;
    oldData: any;
    newData: any;
    oldPValue: any;
    newPValue: any;
    pValueDiff: any;
    rawLink: string;
    portalLink: string;
    resultsLink: string;
    method: string;
    yMax: number;
    yMin: number;
    notProcessedReasons: Array<string>;
    k: number;
    l: number;
    minSamplesReq: number;
    samplesInWindow: number;
}
