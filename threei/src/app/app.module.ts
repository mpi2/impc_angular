import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SlideshowModule} from 'ng-simple-slideshow';
import { MatExpansionModule, MatRadioModule } from '@angular/material';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { LearnMorePageComponent } from './learn-more-page/learn-more-page.component';
import { HighchartsChartComponent } from './highcharts-chart.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule, MatCheckbox, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCardModule, MatSliderModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatCheckboxModule, MatProgressSpinnerModule} from '@angular/material';


import { AppComponent  } from './app.component';
import { MenusModule } from './menus/menus.module';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { DataPageComponent } from './data-page/data-page.component';
import { AnalysisPageComponent, SafePipe } from './analysis-page/analysis-page.component';
import { MethodsPageComponent } from './methods-page/methods-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { GlossaryPageComponent } from './glossary-page/glossary-page.component';
import { PublicationsPageComponent } from './publications-page/publications-page.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { ConsortiumPageComponent } from './consortium-page/consortium-page.component';
import { PhenotypeofthemonthPageComponent } from './phenotypeofthemonth-page/phenotypeofthemonth-page.component';
import { ImageacknowledgementsPageComponent } from './imageacknowledgements-page/imageacknowledgements-page.component';



@NgModule({
  declarations: [
    AppComponent,SafePipe,
    HomePageComponent,
    FaqPageComponent, DataPageComponent, AnalysisPageComponent, MethodsPageComponent, ContactPageComponent, GlossaryPageComponent, 
    PublicationsPageComponent, PrivacyPageComponent, LearnMorePageComponent,
    HighchartsChartComponent,
    HeatmapComponent,
    ConsortiumPageComponent,
    PhenotypeofthemonthPageComponent,
    ImageacknowledgementsPageComponent
  ],
  imports: [
    BrowserModule, MenusModule, AppRoutingModule, SlideshowModule, MatExpansionModule, FormsModule, HttpClientModule, MatRadioModule, MatProgressSpinnerModule, MatSelectModule, MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

 }
