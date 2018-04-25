import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './impc.images.downloader.app';
import { FilterComponent } from './filter/impc.images.filter.component';
import { ImagesRestService, ImagesResponse } from './services/impc.images.rest.service';
import { ShowThumbnailsComponent } from './showthumbnails/impc.images.showthumbnails.component';
import { ProcedureSelectComponent } from './procedure-select/impc.procedure-select.component';
import { ParameterSelectComponent } from './parameter-select/impc.parameter-select.component';
import { MatSelectModule, MatCheckbox, MatButtonModule } from '@angular/material';
import { MatCardModule, MatSliderModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RowsComponent } from './rows/impc.rows.component';
import { LogoComponent } from './logo/logo.component';
import {  MatInputModule } from '@angular/material';
import { AnatomyFilterComponent } from './anatomy-filter/anatomy-filter.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Service2Component } from './services/service2/service2.component';

@NgModule({
  declarations: [
    AppComponent, FilterComponent, ShowThumbnailsComponent, ProcedureSelectComponent, ParameterSelectComponent,
    RowsComponent, LogoComponent, AnatomyFilterComponent, Service2Component
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, MatSelectModule, BrowserAnimationsModule, MatCardModule, MatGridListModule,
    MatCheckboxModule, ReactiveFormsModule, MatSliderModule, MatInputModule, MatButtonModule
  ],
  providers: [ImagesRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
