import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'impc-publication-keyword-list',
  templateUrl: './publication-keyword-list.component.html',
  styleUrls: ['./publication-keyword-list.component.css']
})
export class PublicationKeywordListComponent implements OnInit {

  @Input()
  keywords: any[];

  @Output()
  selectedKeyword = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.keywords.forEach(keyword => keyword.color = 'accent');
  }

  changeSelection(chip) {
    this.keywords.forEach(keyword => {
      if (chip !== keyword && !chip.selected) {
        keyword.selected = false;
      }
    });
    if (!chip.selected) {
      chip.selected = !chip.selected;
      this.selectedKeyword.next(chip.label);
    }
  }
}
