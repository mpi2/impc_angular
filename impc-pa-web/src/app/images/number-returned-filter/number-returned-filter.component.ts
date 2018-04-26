import {Component, ViewEncapsulation} from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
@Component({
  selector: 'app-number-returned-filter',
  templateUrl: './number-returned-filter.component.html',
  styleUrls: ['./number-returned-filter.component.css'],
  encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
})
export class NumberReturnedFilterComponent {
    autoTicks = false;
    max = 1000;
    min = 0;
    showTicks = false;
    step = 1;
    thumbLabel = true;
    value = 10;
    get tickInterval(): number | 'auto' {
      return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
    }
    set tickInterval(v) {
      this._tickInterval = Number(v);
    }
    private _tickInterval = 1;
  }
