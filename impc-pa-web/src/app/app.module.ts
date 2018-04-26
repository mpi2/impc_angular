import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import {  MatInputModule } from '@angular/material';
import { MatSelectModule, MatCheckbox, MatButtonModule } from '@angular/material';
import { MatCardModule, MatSliderModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './impc.images.downloader.app';
import { ImagesRestService, ImagesResponse } from './services/rest.service';
import { ImagesModule } from './images/images.module';
import { ShowThumbnailsComponent } from './showthumbnails/showthumbnails.component';
import { ProcedureSelectComponent } from './procedure-select/procedure-select.component';
import { ParameterSelectComponent } from './parameter-select/parameter-select.component';
import { RowsComponent } from './rows/rows.component';
import { LogoComponent } from './logo/logo.component';
import { FilterComponent } from './filter/filter.component';
import { Service2Component } from './services/service2/service2.component';


@NgModule({
  declarations: [
    AppComponent, FilterComponent, ShowThumbnailsComponent, ProcedureSelectComponent, ParameterSelectComponent,
    RowsComponent, LogoComponent, Service2Component
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, MatSelectModule, BrowserAnimationsModule, MatCardModule, MatGridListModule,
    MatCheckboxModule, ReactiveFormsModule, MatSliderModule, MatInputModule, MatButtonModule, ImagesModule
  ],
  providers: [ImagesRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
