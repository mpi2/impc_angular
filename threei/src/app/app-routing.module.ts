import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent }  from './home-page/home-page.component';
import { FaqPageComponent }    from './faq-page/faq-page.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'faq',
    component: FaqPageComponent,
    // outlet: 'popup'
  },
  
   { path: '',   redirectTo: 'home', pathMatch: 'full' }
//   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class AppRoutingModule { }

