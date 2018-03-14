import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './impc.images.downloader.app';
import { ImageBrowserComponent } from './impc.images.browser.component';
import { FilterComponent } from './impc.images.filter.component';
import { ImagesRestService } from './impc.images.rest.service';
import { ShowThumbnailsComponent } from './impc.images.showthumbnails.component';

@NgModule({
  declarations: [
    AppComponent, ImageBrowserComponent, FilterComponent, ShowThumbnailsComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [ImagesRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
