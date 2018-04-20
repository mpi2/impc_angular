import {Component, ViewEncapsulation} from '@angular/core';
import { MatFormFieldModule } from '@angular/material';

/**
 * @title Configurable slider
 */
@Component({
  selector: 'app-impc-rows',
  templateUrl: 'impc.rows.html',
  styleUrls: ['impc.rows.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class RowsComponent {
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
