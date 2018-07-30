import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'impc-save-images',
  templateUrl: './save-images.component.html',
  styleUrls: ['./save-images.component.css']
})
export class SaveImageComponent implements OnInit {
  @Output()
  saveImagesEvent = new EventEmitter<string>();
  saveImages: boolean;

  constructor() { }

  ngOnInit() {
    this.saveImages = false;
  }

  saveImagesPressed() {
    console.log('save image event fired');
    this.saveImagesEvent.emit();
  }

}
