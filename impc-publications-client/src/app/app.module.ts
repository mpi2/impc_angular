import { PublicationNotLoggedInComponent } from './components/publication/publication-not-loggedin-alert.component';
import { KeepHtmlPipe } from './shared/pipes/keep-html.pipe';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { AlleleAutocompleteService } from './shared/services/allele-autocomplete.service';
import { FragmentsService } from './shared/services/fragments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatToolbarModule, MatIconModule, MatButtonToggleModule, MatChipsModule,
  MatCardModule, MatButtonModule, MatStepperModule, MatPaginatorModule,
  MatSidenavModule, MatListModule, MatCheckboxModule, MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

import { NgxCarouselModule } from 'ngx-carousel';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { StatusFilterComponent } from './components/status-filter/status-filter.component';
import { CountComponent } from './components/count/count.component';
import { PublicationListComponent } from './components/publication-list/publication-list.component';
import { PublicationComponent } from './components/publication/publication.component';
import { FragmentExplorerComponent } from './components/fragment-explorer/fragment-explorer.component';
import { PublicationKeywordListComponent } from './components/publication-keyword-list/publication-keyword-list.component';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { PublicationAlleleAdderComponent } from './components//publication-allele-adder/publication-allele-adder.component';
import { PublicationsService } from './shared/services/publications.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FacetsComponent } from './components/facets/facets.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptor } from './shared/services/interceptor.service';

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
    FacetsComponent,
    LoginComponent,
    PublicationNotLoggedInComponent,
    KeepHtmlPipe
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
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ AuthService, AuthGuard, PublicationsService, FragmentsService, AlleleAutocompleteService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
