import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './impc.images.downloader.app';
import { ImageBrowserComponent } from './impc.images.browser.component';
import { FilterComponent } from './impc.images.filter.component';
import { ImagesRestService } from './impc.images.rest.service';
import { ShowThumbnailsComponent } from './impc.images.showthumbnails.component';
import { ProcedureSelectComponent } from './impc.procedure-select-component';
import { ParameterSelectComponent } from './impc.parameter-select-component';
import { MatSelectModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, ImageBrowserComponent, FilterComponent, ShowThumbnailsComponent, ProcedureSelectComponent, ParameterSelectComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, MatSelectModule, BrowserAnimationsModule
  ],
  providers: [ImagesRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
