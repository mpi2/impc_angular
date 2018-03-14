import { Component, OnInit } from '@angular/core';
import { ImagesRestService, ImagesResponse } from './impc.images.rest.service';

class ImagesFilter {
  constructor(public keyword: string, public rows: number, public parameterNamesForDropdown: string[],
     public selectedParameterName: string , public procedureNamesForDropdown: string[],
     public selectedProcedureName: string) {
  }
}

@Component({
  selector: 'app-filter',
  styleUrls: ['./impc.images.filter.css'],
  templateUrl: `./impc.images.filter.html`,
})
export class FilterComponent implements OnInit {
  config: any;
  images: any[];
  headers: string[];
  imagesResponse: ImagesResponse;
  response: Response;
  model = new ImagesFilter('*:*', 10, ['blood glucose', 'antibody levels', 'sugar'], 'sugar',
  ['procedure1'], 'sugar');

  query() {
    console.log('Logging with', this.model.keyword, this.model.rows, this.model.selectedParameterName);
    this.showImagesResponse(this.model.keyword , this.model.rows, this.model.selectedParameterName, this.model.selectedProcedureName);
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
      });
  }

  getProceduresForDropdown() {
    this.imagesRestService.getPossibleProceduresResponse().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.response = { ... resp.body };
      const proceduresWithCounts = this.response['facet_counts']['facet_fields']['procedure_name'];
      this.model.procedureNamesForDropdown = proceduresWithCounts.filter(function(item, index, array) {  return (index % 2 === 0 ); });
      console.log('selected procedure name in getProceduresForDropdown=' + this.model.procedureNamesForDropdown);
      this.model.selectedProcedureName = this.model.procedureNamesForDropdown[0];
    });

  }

  getParametersForDropdown() {
    this.imagesRestService.getPossibleParametersResponse().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.response = { ... resp.body };
      const parametersWithCounts = this.response['facet_counts']['facet_fields']['parameter_name'];
      this.model.parameterNamesForDropdown = parametersWithCounts.filter(function(item, index, array) {  return (index % 2 === 0 ); });
      console.log('selected parameter name in getParametersForDropdown=' + this.model.parameterNamesForDropdown);
      this.model.selectedParameterName = this.model.parameterNamesForDropdown[0];
    });

  }
  constructor(private imagesRestService: ImagesRestService) {
  }

  ngOnInit() {
    // this.model.images = this.images;
    this.getProceduresForDropdown();
    this.getParametersForDropdown();
  }
}
