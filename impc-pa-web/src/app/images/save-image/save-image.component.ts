import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'impc-save-image',
  templateUrl: './save-image.component.html',
  styleUrls: ['./save-image.component.css']
})
export class SaveImageComponent implements OnInit {
  saveImages: boolean;
  constructor() { }

  ngOnInit() {
    this.saveImages = false;
  }

  // saveImageSelected(saveUrl: string) {
  //   console.log('save image event fired');

  // }

}
