import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ImagesRestService, ImagesResponse } from './impc.images.rest.service';
import { ProcedureSelectComponent } from './impc.procedure-select-component';
import { ParameterSelectComponent } from './impc.parameter-select-component';
import { ShowThumbnailsComponent } from './impc.images.showthumbnails.component';
import { RowsComponent } from './impc.rows.component';

@Component({
  selector: 'app-filter',
  styleUrls: ['./impc.images.filter.css'],
  templateUrl: `./impc.images.filter.html`,
})
export class FilterComponent implements OnInit, AfterViewInit {

  @ViewChild(RowsComponent)
  private rowsComponent: RowsComponent;
  @ViewChild(ProcedureSelectComponent)
  private procedureSelector: ProcedureSelectComponent;
  @ViewChild(ParameterSelectComponent)
  private parameterSelector: ParameterSelectComponent;
  @ViewChild(ShowThumbnailsComponent)
  private showThumbnailsComponent;

  private keyword: string;
  config: any;
  images: any[];
  headers: string[];
  imagesResponse: ImagesResponse;
  response: Response;

  query() {
    this.keyword = '*:*';
    console.log('Logging with', 'keywordhere', this.rowsComponent.value, this.parameterSelector.selectedParameterName,
    'procedurename here', this.procedureSelector.selectedProcedureName);
    this.showImagesResponse(this.keyword , this.rowsComponent.value, this.parameterSelector.selectedParameterName,
      this.procedureSelector.selectedProcedureName);
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
  }

  ngAfterViewInit() {
  }
}
