import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule, MatCheckbox, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCardModule, MatSliderModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ThumbnailsComponent } from './thumbnails/thumbnails.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ParameterSelectComponent } from './parameter-select/parameter-select.component';
import { ProcedureSelectComponent } from './procedure-select/procedure-select.component';
import { AnatomySelectComponent } from './anatomy-select/anatomy-select.component';
import { FilterComponent } from './filter/filter.component';
import { NumberReturnedFilterComponent } from './number-returned-filter/number-returned-filter.component';
import { LogoComponent } from './logo/logo.component';
import { ImageService } from './image.service';
import { SaveImageComponent } from './save-images/save-images.component';
import { ImageSaverService } from './image-saver.service';
import { DownloaderService } from './downloader.service';
@NgModule({
  imports: [
    CommonModule, MatSelectModule, FormsModule, MatSelectModule,
     BrowserAnimationsModule, MatCardModule, MatGridListModule,
    MatCheckboxModule, ReactiveFormsModule, MatSliderModule, MatInputModule, MatButtonModule
  ],
  declarations: [ThumbnailsComponent, ParameterSelectComponent, ProcedureSelectComponent, AnatomySelectComponent,
    FilterComponent, NumberReturnedFilterComponent, AnatomySelectComponent, LogoComponent, SaveImageComponent, ThumbnailComponent],
    exports: [
      AnatomySelectComponent, LogoComponent, FilterComponent
    ],
    providers: [ImageService, ImageSaverService, DownloaderService]
})
export class ImagesModule { }
