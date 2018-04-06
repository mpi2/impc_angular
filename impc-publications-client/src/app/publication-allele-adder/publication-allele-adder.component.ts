import { AlleleAutocompleteService } from './../shared/services/allele-autocomplete.service';
import { Component, OnInit, Input } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatAutocompleteSelectedEvent} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
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

  filteredOptions: Observable<string[]>;
  myControl: FormControl = new FormControl();

  @Input()
  alleles = [];

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
      this.alleles.push(value.trim());
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
      this.alleles.push(value.trim());
    }
  }

  remove(allele: any, textInput): void {
    const index = this.alleles.indexOf(allele);

    if (index >= 0) {
      this.alleles.splice(index, 1);
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
