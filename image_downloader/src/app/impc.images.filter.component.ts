import { Component, OnInit,  ViewEncapsulation } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ImagesRestService, ImagesResponse } from './impc.images.rest.service';
import { ShowThumbnailsComponent } from './impc.images.showthumbnails.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-filter',
  styleUrls: ['./impc.images.filter.css'],
  templateUrl: `./impc.images.filter.html`,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class FilterComponent implements OnInit, AfterViewInit {
  @ViewChild(ShowThumbnailsComponent)
  private showThumbnailsComponent;

  autoTicks = false;
  max = 1000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  rows = 100;
  private _tickInterval = 1;
  private keyword: string;
  config: any;
  images: any[];
  headers: string[];
  imagesResponse: ImagesResponse;
  response: Response;
  procedureResponse: Response;
  procedureNamesForDropdown: string[];
  selectedProcedureName: string;
  parameterResponse: Response;
  parameterNamesForDropdown: string[];
  selectedParameterName: string;
  disableSelect = new FormControl(false);

  query() {
    this.keyword = '*:*';
    console.log('Logging with', 'keywordhere', 10, this.selectedParameterName,
    'procedurename here', this.selectedProcedureName);
    this.showImagesResponse(this.keyword , this.rows, this.selectedParameterName,
      this.selectedProcedureName);
    // this.model = new ImagesFilter(this.model.keyword, this.model.rows, ['blood glucose', 'antibody levels', 'sugar'], this, this.images);
  }

  showImagesResponse(query , rows, selectedParameterName, selectedProcedureName) {
    this.imagesRestService.getImagesResponse(query, rows, selectedParameterName, selectedProcedureName)
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
          console.log('headers=' + this.headers);
        // access the body directly, which is typed as `Config`.
        this.response = { ... resp.body };
        this.images = this.response['response']['docs'];
        this.showThumbnailsComponent.setImages(this.images);
      });
  }

  constructor(private imagesRestService: ImagesRestService) {
  }

  ngOnInit() {
    // this.model.images = this.images;
    this.getProceduresForDropdown();
    this.getParametersForDropdown();
  }

  ngAfterViewInit() {
  }

  getProceduresForDropdown() {
    this.imagesRestService.getPossibleProceduresResponse().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.procedureResponse = { ... resp.body };
      const proceduresWithCounts = this.procedureResponse['facet_counts']['facet_fields']['procedure_name'];
      this.procedureNamesForDropdown = proceduresWithCounts.filter(function(item, index, array) {  return (index % 2 === 0 ); });
      console.log('getProceduresForDropdown=' + this.procedureNamesForDropdown);
      this.procedureNamesForDropdown.unshift('None');
      this.selectedProcedureName = this.procedureNamesForDropdown[0];
    });
  }

  getParametersForDropdown() {
    this.imagesRestService.getPossibleParametersResponse().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.parameterResponse = { ... resp.body };
      const parametersWithCounts = this.parameterResponse['facet_counts']['facet_fields']['parameter_name'];
      this.parameterNamesForDropdown = parametersWithCounts.filter(function(item, index, array) {  return (index % 2 === 0 ); });
      this.parameterNamesForDropdown.unshift('None');
      console.log('getParametersForDropdown=' + this.parameterNamesForDropdown);
      this.selectedParameterName = this.parameterNamesForDropdown[0];
    });

  }


  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }



}
