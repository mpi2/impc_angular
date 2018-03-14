import { Component, OnInit} from '@angular/core';
import { ImagesRestService } from './impc.images.rest.service';

@Component({
    selector: 'app-showthumbnails',
    styleUrls: ['./impc.images.showthumbnails.css'],
    templateUrl: `./impc.images.showthumbnails.html`,
    providers: [ImagesRestService]
  })
export class ShowThumbnailsComponent implements OnInit {
images: any[];
    constructor(private imagesRestService: ImagesRestService) {
    }

    // public getImages() {
    //     this.imagesRestService.getImages();
    // }

    ngOnInit() {
        // this.images = this.imagesRestService.getImages();
    }
}
