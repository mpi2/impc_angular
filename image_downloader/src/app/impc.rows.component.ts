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
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;
}
