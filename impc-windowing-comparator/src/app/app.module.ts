import { SolrService } from './shared/solr.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './components/filter/filter.component';
import {
  MatToolbarModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatChipsModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatButtonModule
} from '@angular/material';
import {
  HomeComponent,
  ErrorMessageComponent
} from './pages/home/home.component';
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { LogoComponent } from './components/logo/logo.component';
import { ComparisonListComponent } from './components/comparison-list/comparison-list.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { SafePipe } from './shared/safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { DiffComponent } from './components/diff/diff.component';
import { BioschemasMetadataComponent } from './components/bioschemas-metadata/bioschemas-metadata.component';
import * as more from 'highcharts/highcharts-more.src';
import * as histogram from 'highcharts/modules/histogram-bellcurve';
import * as exporting from 'highcharts/modules/exporting.src';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeadBarComponent,
    LogoComponent,
    HomeComponent,
    FilterComponent,
    ComparisonListComponent,
    ComparisonComponent,
    SafePipe,
    TableComponent,
    ErrorMessageComponent,
    DiffComponent,
    BioschemasMetadataComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSelectModule,
    ChartModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatChipsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
    DndModule.forRoot(),
    RouterModule.forRoot([{ path: '**', component: HomeComponent }])
  ],
  providers: [
    SolrService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting, histogram ] }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorMessageComponent]
})
export class AppModule {}
