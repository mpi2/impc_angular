import { AlleleAutocompleteService } from './shared/services/allele-autocomplete.service';
import { FragmentsService } from './shared/services/fragments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatToolbarModule, MatIconModule, MatButtonToggleModule, MatChipsModule,
  MatCardModule, MatButtonModule, MatStepper, MatStepperModule, MatPaginatorModule, MatSidenavModule, MatListModule, MatCheckboxModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

import { NgxCarouselModule } from 'ngx-carousel';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeadBarComponent } from './head-bar/head-bar.component';
import { LogoComponent } from './logo/logo.component';
import { FooterComponent } from './footer/footer.component';
import { StatusFilterComponent } from './status-filter/status-filter.component';
import { CountComponent } from './count/count.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationComponent } from './publication/publication.component';
import { FragmentExplorerComponent } from './fragment-explorer/fragment-explorer.component';
import { PublicationKeywordListComponent } from './publication-keyword-list/publication-keyword-list.component';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { PublicationAlleleAdderComponent } from './publication-allele-adder/publication-allele-adder.component';
import { PublicationsService } from './shared/services/publications.service';
import { HttpClientModule } from '@angular/common/http';
import { FacetsComponent } from './facets/facets.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeadBarComponent,
    LogoComponent,
    FooterComponent,
    StatusFilterComponent,
    CountComponent,
    PublicationListComponent,
    PublicationComponent,
    FragmentExplorerComponent,
    PublicationKeywordListComponent,
    PublicationAlleleAdderComponent,
    FacetsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatCardModule,
    MatStepperModule,
    NgxCarouselModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ PublicationsService, FragmentsService, AlleleAutocompleteService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
