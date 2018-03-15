import { Component, OnInit } from '@angular/core';
import { ImagesRestService, ImagesResponse } from './impc.images.rest.service';

/**
 * @title Basic select
 */
@Component({
  selector: 'app-parameter-select',
  templateUrl: 'impc.parameter-select.html',
  styleUrls: ['impc.parameter-select.css'],
})
export class ParameterSelectComponent implements OnInit {
  response: Response;
  parameterNamesForDropdown: string[];
  selectedParameterName: string;

  getParametersForDropdown() {
    this.imagesRestService.getPossibleParametersResponse().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.response = { ... resp.body };
      const parametersWithCounts = this.response['facet_counts']['facet_fields']['parameter_name'];
      this.parameterNamesForDropdown = parametersWithCounts.filter(function(item, index, array) {  return (index % 2 === 0 ); });
      console.log('getParametersForDropdown=' + this.parameterNamesForDropdown);
      this.selectedParameterName = this.parameterNamesForDropdown[0];
    });

  }
  constructor(private imagesRestService: ImagesRestService) {
  }

  ngOnInit() {
    // this.model.images = this.images;
    this.getParametersForDropdown();
  }
}

