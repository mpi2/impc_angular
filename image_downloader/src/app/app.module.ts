import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './impc.images.downloader.app';
import { ImageBrowserComponent } from './impc.images.browser.component';
import { FilterComponent } from './filter/impc.images.filter.component';
import { ImagesRestService } from './services/impc.images.rest.service';
import { ShowThumbnailsComponent } from './showthumbnails/impc.images.showthumbnails.component';
import { ProcedureSelectComponent } from './procedure-select/impc.procedure-select-component';
import { ParameterSelectComponent } from './parameter-select/impc.parameter-select-component';
import { MatSelectModule, MatCheckbox } from '@angular/material';
import { MatCardModule, MatSliderModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RowsComponent } from './rows/impc.rows.component';
import { LogoComponent } from './logo/logo.component';
import {  MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent, ImageBrowserComponent, FilterComponent, ShowThumbnailsComponent, ProcedureSelectComponent, ParameterSelectComponent,
    RowsComponent, LogoComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, MatSelectModule, BrowserAnimationsModule, MatCardModule, MatGridListModule,
    MatCheckboxModule, ReactiveFormsModule, MatSliderModule, MatInputModule
  ],
  providers: [ImagesRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
