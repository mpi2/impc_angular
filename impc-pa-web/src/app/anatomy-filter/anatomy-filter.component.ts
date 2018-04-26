 import { Component, OnInit, Output, EventEmitter } from '@angular/core';
 import { ImagesRestService, ImagesResponse } from '../services/rest.service';

@Component({
  selector: 'app-anatomy-filter2',
  templateUrl: './anatomy-filter.component.html',
  styleUrls: ['./anatomy-filter.component.css']
})
export class AnatomyFilterComponent implements OnInit {

  @Output() anatomySelectedEvent = new EventEmitter<string>();
  response: Response;
  anatomyNamesForDropdown: string [];
  selectedAnatomyName: string;

  constructor(private imagesRestService: ImagesRestService) { }

  getAnatomysForDropdown() {
    this.imagesRestService.getPossibleAnatomyResponse().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.response = { ... resp.body };
      const proceduresWithCounts = this.response['facet_counts']['facet_fields']['anatomy_term'];
      this.anatomyNamesForDropdown = proceduresWithCounts.filter(function(item, index, array) {  return (index % 2 === 0 ); });
      console.log('anatomyNamesForDropdown=' + this.anatomyNamesForDropdown);
      this.anatomyNamesForDropdown.unshift('None');
      this.selectedAnatomyName = this.anatomyNamesForDropdown[0];
    });
  }

  anatomySelected(selectedAnatomyName: string) {
    console.log('event called in selectedAnatomyName with ' + selectedAnatomyName);
    this.anatomySelectedEvent.emit(selectedAnatomyName);
  }

  ngOnInit() {
    this.getAnatomysForDropdown();
  }

}
