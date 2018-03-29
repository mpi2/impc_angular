import { Component, OnInit } from '@angular/core';
import { ImagesRestService, ImagesResponse } from './impc.images.rest.service';

/**
 * @title Basic select
 */
@Component({
  selector: 'app-procedure-select',
  templateUrl: 'impc.procedure-select.html',
  styleUrls: ['impc.procedure-select.css'],
})
export class ProcedureSelectComponent implements OnInit {
  response: Response;
  procedureNamesForDropdown: string[];
  selectedProcedureName: string;

  getProceduresForDropdown() {
    this.imagesRestService.getPossibleProceduresResponse().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.response = { ... resp.body };
      const proceduresWithCounts = this.response['facet_counts']['facet_fields']['procedure_name'];
      this.procedureNamesForDropdown = proceduresWithCounts.filter(function(item, index, array) {  return (index % 2 === 0 ); });
      console.log('getProceduresForDropdown=' + this.procedureNamesForDropdown);
      this.procedureNamesForDropdown.unshift('None');
      this.selectedProcedureName = this.procedureNamesForDropdown[0];
    });
  }

  constructor(private imagesRestService: ImagesRestService) {
  }

  ngOnInit() {
    // this.model.images = this.images;
    this.getProceduresForDropdown();
  }
}

