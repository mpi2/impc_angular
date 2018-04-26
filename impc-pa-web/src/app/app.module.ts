import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './impc.images.downloader.app';
import { ImagesModule } from './images/images.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
     ReactiveFormsModule,  ImagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
