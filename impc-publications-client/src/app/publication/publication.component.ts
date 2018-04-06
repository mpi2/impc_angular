import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Publication } from '../shared/models/publication.model';

@Component({
  selector: 'impc-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @HostBinding('class')
  classes = 'publication';

  @Input()
  publication: Publication;

  constructor() { }

  ngOnInit() {
  }

}
