import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatCheckbox, MatButtonModule } from '@angular/material';
import { ThumbnailsComponent } from './thumbnails/thumbnails.component';
import { ParameterSelectComponent } from './parameter-select/parameter-select.component';
import { ProcedureSelectComponent } from './procedure-select/procedure-select.component';
import { AnatomySelectComponent } from './anatomy-select/anatomy-select.component';
import { FilterComponent } from './filter/filter.component';
import { NumberReturnedFilterComponent } from './number-returned-filter/number-returned-filter.component';
import { ImageService } from './image.service';

@NgModule({
  imports: [
    CommonModule, MatSelectModule
  ],
  declarations: [ThumbnailsComponent, ParameterSelectComponent, ProcedureSelectComponent, AnatomySelectComponent,
    FilterComponent, NumberReturnedFilterComponent, AnatomySelectComponent],
    exports: [
      AnatomySelectComponent
    ],
    providers: [ImageService]
})
export class ImagesModule { }
