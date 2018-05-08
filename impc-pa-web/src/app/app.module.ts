import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './impc.images.downloader.app';
import { ImagesModule } from './images/images.module';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
     ReactiveFormsModule,  ImagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
