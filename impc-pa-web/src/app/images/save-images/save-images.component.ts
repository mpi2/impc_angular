import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'impc-save-images',
  templateUrl: './save-images.component.html',
  styleUrls: ['./save-images.component.css']
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
