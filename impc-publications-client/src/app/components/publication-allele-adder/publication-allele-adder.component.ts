import { AlleleAutocompleteService } from './../../shared/services/allele-autocomplete.service';
import { Component, OnInit, Input } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatAutocompleteSelectedEvent} from '@angular/material';
import {FormControl} from '@angular/forms';
import { Observable} from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

@Component({
  selector: 'impc-publication-allele-adder',
  templateUrl: './publication-allele-adder.component.html',
  styleUrls: ['./publication-allele-adder.component.css']
})
export class PublicationAlleleAdderComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  options = [];
  private _alleles = [];

  filteredOptions: Observable<any[]>;
  myControl: FormControl = new FormControl();

  @Input()
  set alleles(alleles) {
    this._alleles = alleles;
  }

  get alleles(): Array<any> {
    return this._alleles;
  }

  separatorKeysCodes = [ENTER, COMMA];


  constructor(private allelesService: AlleleAutocompleteService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      mergeMap(val => this.filter(val))
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.options.indexOf(value.trim())) {
      this._alleles.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  addFromAutcomplete(event: MatAutocompleteSelectedEvent, textInput): void {
    const value = event.option.value;
    if ((value || '').trim()) {
      this.myControl.setValue('');
      textInput.value = '';
      this._alleles.push({'alleleSymbol': value.trim()});
    }
  }

  remove(allele: any, textInput): void {
    const index = this._alleles.indexOf(allele);

    if (index >= 0) {
      this._alleles.splice(index, 1);
      this.myControl.setValue('');
    }
  }

  filter(val: string) {
    return this.allelesService.getAlleles(val);
  }

  pasteEvent($event) {
    console.log($event.clipboardData.getData('Text'));
  }

}
