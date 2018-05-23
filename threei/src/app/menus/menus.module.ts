import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TopMenuComponent } from './top-menu/top-menu.component';


@NgModule({
  imports: [
    CommonModule, MatMenuModule, BrowserAnimationsModule, MatButtonModule
  ],
  declarations: [TopMenuComponent],
  exports : [TopMenuComponent]
})
export class MenusModule { }
