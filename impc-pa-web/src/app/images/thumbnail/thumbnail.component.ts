import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'impc-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @Input()
  image: any;
  saveImage = true;
  constructor() {
   }

  ngOnInit() {
  }

  setImage(image: any) {
    this.image = image;
  }

}
