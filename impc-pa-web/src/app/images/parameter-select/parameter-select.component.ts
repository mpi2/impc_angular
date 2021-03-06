import { Component, OnInit } from '@angular/core';
import { ImageService, ImagesResponse } from '../image.service';
import {FormControl} from '@angular/forms';

/**
 * @title Basic select
 */
@Component({
  selector: 'app-parameter-select',
  templateUrl: 'parameter-select.component.html',
  styleUrls: ['parameter-select.component.css'],
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
  constructor(private imagesRestService: ImageService) {
  }

  ngOnInit() {
    // this.model.images = this.images;
    this.getParametersForDropdown(undefined);
  }
}
