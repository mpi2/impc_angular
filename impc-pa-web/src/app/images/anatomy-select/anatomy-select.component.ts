import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ImageService, ImagesResponse } from '../image.service';

@Component({
  selector: 'app-anatomy-select',
  templateUrl: './anatomy-select.component.html',
  styleUrls: ['./anatomy-select.component.css']
})
export class AnatomySelectComponent implements OnInit {
  @Output() anatomySelectedEvent = new EventEmitter<string>();
  response: Response;
  anatomyNamesForDropdown: string [];
  selectedAnatomyName: string;

  constructor(private imagesService: ImageService) { }

  getAnatomysForDropdown() {
    this.imagesService.getPossibleAnatomyResponse().subscribe(resp => {
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
