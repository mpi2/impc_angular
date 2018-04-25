import { Component, OnInit } from '@angular/core';
import { ImagesRestService, ImagesResponse } from '../services/impc.images.rest.service';
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

  getParametersForDropdown(procedureFilter?: string) {
    this.imagesRestService.getPossibleParametersResponse(procedureFilter).subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      console.log('calling getparametersforDropdown');
      this.response = { ... resp.body };
      const parametersWithCounts = this.response['facet_counts']['facet_fields']['parameter_name'];
      this.parameterNamesForDropdown = parametersWithCounts.filter(function(item, index, array) {
        const filteredItems: Array <string> = [];
        if (index % 2 === 0 ) {
          if ( array[index + 1] > 0) {
            filteredItems.push(item);
            console.log('iterm=' + item);
            return item;
          }
        }
          // return filteredItems;
        });
      this.parameterNamesForDropdown.unshift('None');
      console.log('getParametersForDropdown=' + this.parameterNamesForDropdown);
      this.selectedParameterName = this.parameterNamesForDropdown[0];
    });

  }
  constructor(private imagesRestService: ImagesRestService) {
  }

  ngOnInit() {
    // this.model.images = this.images;
    this.getParametersForDropdown(undefined);
  }
}

