import { Component, OnInit} from '@angular/core';
import { ImageService } from '../image.service';
import { MatCard } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-showthumbnails',
    styleUrls: ['./thumbnails.component.css'],
    templateUrl: `./thumbnails.component.html`,
    providers: [ImageService]
  })
export class ThumbnailsComponent implements OnInit {
images: any[];
    constructor(private imagesRestService: ImageService) {
    }

    public setImages(images) {
        console.log('caling set images now');
        this.images = images;
    }
    // public getImages() {
    //     this.imagesRestService.getImages();
    // }

    ngOnInit() {}
}
