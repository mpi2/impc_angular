import { Component, OnInit} from '@angular/core';
import { ImagesRestService } from './impc.images.rest.service';
import { MatCard } from '@angular/material';

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

    public setImages(images) {
        console.log('caling set images now');
        this.images = images;
    }
    // public getImages() {
    //     this.imagesRestService.getImages();
    // }

    ngOnInit() {
    }
}
