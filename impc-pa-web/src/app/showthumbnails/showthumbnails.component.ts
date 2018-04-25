import { Component, OnInit} from '@angular/core';
import { ImagesRestService } from '../services/rest.service';
import { MatCard } from '@angular/material';

@Component({
    selector: 'app-showthumbnails',
    styleUrls: ['./showthumbnails.css'],
    templateUrl: `./showthumbnails.html`,
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
