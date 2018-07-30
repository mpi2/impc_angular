import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ImageService, ImagesResponse } from '../image.service';

/**
 * @title Basic select
 */
@Component({
  selector: 'app-procedure-select',
  templateUrl: 'procedure-select.component.html',
  styleUrls: ['procedure-select.component.css'],
})
export class ProcedureSelectComponent implements OnInit {
  @Output() procedureSelectedEvent = new EventEmitter<string>();
  response: Response;
  procedureNamesForDropdown: string[];
  selectedProcedureName: string;

  procedureSelected(selectedProcedure: string) {
    console.log('event called in procedureSelected with ' + selectedProcedure);
    this.procedureSelectedEvent.emit(selectedProcedure);
  }

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

  constructor(private imagesRestService: ImageService) {
  }

  ngOnInit() {
    // this.model.images = this.images;
    this.getProceduresForDropdown();
  }
}
