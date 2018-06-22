import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ImageService, ImagesResponse } from '../image.service';
import { ProcedureSelectComponent } from '../procedure-select/procedure-select.component';
import { ParameterSelectComponent } from '../parameter-select/parameter-select.component';
import { ThumbnailsComponent } from '../thumbnails/thumbnails.component';
import { NumberReturnedFilterComponent } from '../number-returned-filter/number-returned-filter.component';
import { AnatomySelectComponent } from '../anatomy-select/anatomy-select.component';
import { SaveImageComponent } from '../save-images/save-images.component';
import { ImageSaverService } from '../image-saver.service';
// import { ImagesModule } from '../images/images.module';

@Component({
  selector: 'app-filter',
  styleUrls: ['./filter.component.css'],
  templateUrl: `./filter.component.html`,
})
export class FilterComponent implements OnInit, AfterViewInit {

  @ViewChild(NumberReturnedFilterComponent)
  private rowsComponent: NumberReturnedFilterComponent;
  @ViewChild(ProcedureSelectComponent)
  private procedureSelector: ProcedureSelectComponent;
  @ViewChild(ParameterSelectComponent)
  private parameterSelector: ParameterSelectComponent;
  @ViewChild(ThumbnailsComponent)
  private showThumbnailsComponent;
  @ViewChild(AnatomySelectComponent)
  private anatomySelectComponent;
  @ViewChild(SaveImageComponent)
  private saveImageComponent;

  private keyword: string;
  config: any;
  images: any[];
  headers: string[];
  imagesResponse: ImagesResponse;
  response: Response;

  query() {
    this.keyword = '*:*';
    console.log('Logging with', 'keywordhere', this.rowsComponent.value, this.parameterSelector.selectedParameterName,
    'procedurename here', this.procedureSelector.selectedProcedureName, ' save images =', this.saveImageComponent.saveImages);
    this.showImagesResponse(this.saveImageComponent.saveImages , this.keyword , this.rowsComponent.value,
      this.parameterSelector.selectedParameterName,
      this.procedureSelector.selectedProcedureName, this.anatomySelectComponent.selectedAnatomyName);
    // this.model = new ImagesFilter(this.model.keyword, this.model.rows, ['blood glucose', 'antibody levels', 'sugar'], this, this.images);
  }

  showImagesResponse(saveImages , query , rows, selectedParameterName, selectedProcedureName, selectedAnatomyName) {
    if ( !saveImages) {
    this.imagesRestService.getImagesResponse(query, rows, selectedParameterName, selectedProcedureName, selectedAnatomyName)
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
          console.log('headers=' + this.headers);
        // access the body directly, which is typed as `Config`.
        this.response = { ... resp.body };
        this.images = this.response['response']['docs'];
        this.rowsComponent.max = this.response['response'].numFound;
        this.showThumbnailsComponent.setImages(this.images);
      });
    } else {
      console.log('saving images in filterComponent');

      this.imagesRestService.getImagesResponse(query, rows, selectedParameterName, selectedProcedureName, selectedAnatomyName)
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // do things to save images here
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
          console.log('headers=' + this.headers);
        // access the body directly, which is typed as `Config`.
        this.response = { ... resp.body };
        this.images = this.response['response']['docs'];
        this.rowsComponent.max = this.response['response'].numFound;
        this.showThumbnailsComponent.setImages(this.images);
        this.saveImages(this.images);
      });
    }
  }

  constructor(private imagesRestService: ImageService, private imageSaverService: ImageSaverService) {
  }


  saveImagesEvent() {
    console.log('images event caught in filter');
    this.showThumbnailsComponent.saveImagesSelected();
  }

  saveImages(images: any[]) {
    console.log('saving images now with ' + images.length + ' images');
    for (let image of images ) {
        console.log(image.download_url);
        // this.imageSaverService.saveFile(image.omero_id);
        this.imageSaverService.download(image.omero_id);
    }

  }

  procedureSelectedEvent(procedureSelected: string) {
    console.log('event caught in filter from procedureSelect?' + procedureSelected);
    // filter the parameters in the dropdown we can select based on the procedure selected
    if (procedureSelected === 'None') {
      procedureSelected = undefined;
    }
    this.parameterSelector.getParametersForDropdown(procedureSelected);
    // this.query();
  }

  anatomySelectedEvent(anatomySelected: string) {
    console.log('event caught in filter from anatomySelect?' + anatomySelected);
    // filter the parameters in the dropdown we can select based on the procedure selected
    if (anatomySelected === 'None') {
      anatomySelected = undefined;
    }
    // this.anatomyFilterComponent.getAnatomysForDropdown(anatomySelected);
    // this.query();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.query();
  }
}
