import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenusModule } from './menus/menus.module';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MenusModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
