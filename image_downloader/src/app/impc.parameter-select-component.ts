import { Component, OnInit } from '@angular/core';
import { ImagesRestService, ImagesResponse } from './impc.images.rest.service';
import {FormControl} from '@angular/forms';

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
  disableSelect = new FormControl(false);

  getParametersForDropdown() {
    this.imagesRestService.getPossibleParametersResponse().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.response = { ... resp.body };
      const parametersWithCounts = this.response['facet_counts']['facet_fields']['parameter_name'];
      this.parameterNamesForDropdown = parametersWithCounts.filter(function(item, index, array) {  return (index % 2 === 0 ); });
      this.parameterNamesForDropdown.unshift('None');
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

