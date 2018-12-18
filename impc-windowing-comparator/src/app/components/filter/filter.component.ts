import { ActivatedRoute, Router } from '@angular/router';
import { SolrService } from './../../shared/solr.service';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material';
import { QueryList } from '@angular/core';

class DynamycOptions {
  center: Observable<any>;
  colonyID: Observable<any>;
  zygosity: Observable<any>;
  procedure: Observable<any>;
  parameter: Observable<any>;
  alleleSymbol: Observable<any>;
  metadata: Observable<any>;
}

@Component({
  selector: 'impc-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {
  dynamicOptions = new DynamycOptions();
  filters = [
    { name: 'alleleSymbol', type: 'autocomplete', title: 'Allele Symbol' },
    { name: 'parameter', type: 'autocomplete', title: 'Parameter' },
    { name: 'center', type: 'select', title: 'Center' },
    { name: 'colonyID', type: 'autocomplete', title: 'Colony ID' },
    { name: 'zygosity', type: 'select', title: 'Zygosity' },
    { name: 'procedure', type: 'autocomplete', title: 'Procedure' },

    { name: 'metadata', type: 'none', title: 'Metadata' }
  ];
  formGroup: FormGroup;
  editing = false;
  loading = {
    alleleSymbol: false,
    colonyID: false,
    procedure: false,
    parameter: false,
    center: false,
    zygosity: false
  };
  version = 'DR8|Results_8';

  autocompletes = {};

  @Output()
  updateChart: EventEmitter<any> = new EventEmitter();
  @Output()
  invalid: EventEmitter<any> = new EventEmitter();
  @ViewChildren(MatAutocomplete)
  matAutocompletes: QueryList<MatAutocomplete>;

  constructor(
    private fb: FormBuilder,
    private solr: SolrService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      alleleSymbol: ['', Validators.required],
      colonyID: ['', Validators.required],
      procedure: ['', Validators.required],
      parameter: ['', Validators.required],
      center: ['', Validators.required],
      zygosity: ['', Validators.required],
      metadata: ['', Validators.required]
    });
    this.filters = localStorage.getItem('filters')
      ? JSON.parse(localStorage.getItem('filters'))
      : this.filters;
  }

  ngOnInit() {
    this.formGroup.disable();
    this.formGroup.controls[this.filters[0].name].enable();
    this.getOptions(this.filters[0], '');
    this._route.queryParams.pipe(first()).subscribe(params => {
      if (params['version'] !== undefined) {
        this.version = params['version'];
      }
      for (let i = 0; i < this.filters.length; i++) {
        const filter = this.filters[i];
        const filterName = filter.name;
        if (filterName === 'zygosity' || filterName === 'center') {
          this.dynamicOptions[filterName] = this.solr.query(
            this.makeQuery(filterName, ''),
            filterName
          );
        }
        if (params[filterName] === undefined) {
          this.updateParams({});
          break;
        }
        this.formGroup.controls[filterName].setValue(params[filterName]);
        if (this.getNextFilter(filter) !== null) {
          this.formGroup.controls[this.getNextFilter(filter).name].enable();
        } else {
          if (this.formGroup.value['procedure'].split(' | ')[0] === '') {
            const procedureID = this.formGroup.value['procedure'].split(
              ' | '
            )[1];
            this.solr.getProcedureName(procedureID).subscribe(procedureName => {
              this.formGroup.controls['procedure'].setValue(
                `${procedureName} | ${procedureID}`,
                { emitEvent: false }
              );
              if (this.formGroup.value['parameter'].split(' | ')[0] === '') {
                const parameterID = this.formGroup.value['parameter'].split(
                  ' | '
                )[1];
                this.solr
                  .getParameterName(parameterID)
                  .subscribe(parameterName => {
                    this.formGroup.controls['parameter'].setValue(
                      `${parameterName} | ${parameterID}`,
                      { emitEvent: false }
                    );
                    this.update();
                  });
              } else {
                this.update();
              }
            });
          } else {
            this.update();
          }
        }
      }
    });
    this.filters.filter(filter => filter.type !== 'none').forEach(filter => {
      this.formGroup.controls[filter.name].valueChanges.subscribe(value => {
        if (filter.type === 'autocomplete' || value === '') {
          this.getOptions(filter, value);
        }
        const nextFilter = this.getNextFilter(filter);
        this.formGroup.controls[nextFilter.name].setValue('');
        this.formGroup.controls[nextFilter.name].disable();
      });
    });
    this.formGroup.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.invalid.emit(status);
      }
    });
  }

  ngAfterViewInit() {}

  selected(filter, userSelected) {
    const nextFilter = this.getNextFilter(filter);
    this.formGroup.controls[nextFilter.name].enable();
    this.loading[filter.name] = false;
    if (nextFilter.name === 'metadata') {
      this.solr
        .query(this.makeQuery('metadata', ''), 'metadata')
        .subscribe(result => {
          this.formGroup.controls['metadata'].setValue(result.join(','));
          this.update();
        });
    } else {
      this.getOptions(nextFilter, '', userSelected);
    }
  }

  getOptions(filter, text, selected?) {
    let pivot = null;
    if (filter.name === 'parameter') {
      pivot = `${filter.name}_stable_id,${filter.name}_name`;
    } else if (filter.name === 'procedure') {
      pivot = `${filter.name}_group,${filter.name}_name`;
    }

    if (filter.type === 'autocomplete') {
      if (this.formGroup.controls[filter.name].enabled) {
        this.loading[filter.name] = true;
      }
      this.dynamicOptions[filter.name] = this.solr.query(
        this.makeQuery(filter.name, text),
        filter.name,
        pivot
      );
      this.dynamicOptions[filter.name].subscribe(
        options => this.updateOptions(filter, options, selected),
        options => this.updateOptions(filter, options, selected)
      );
    } else if (text === '') {
      if (this.formGroup.controls[filter.name].enabled) {
        this.loading[filter.name] = true;
      }
      this.dynamicOptions[filter.name] = this.solr.query(
        this.makeQuery(filter.name, ''),
        filter.name
      );
      this.dynamicOptions[filter.name].subscribe(
        options => this.updateOptions(filter, options, selected),
        options => this.updateOptions(filter, options, selected)
      );
    }
  }

  updateOptions(filter, options, selected) {
    this.loading[filter.name] = false;
    if (options.length === 1 && selected) {
      const option =
        typeof options[0] !== 'string'
          ? `${options[0].name} | ${options[0].id}`
          : options[0];
      this.formGroup.controls[filter.name].setValue(option, {
        emitEvent: false
      });
      this.selected(filter, selected);
    }
  }

  update() {
    const value = this.formGroup.value;
    value['version'] = this.version;
    this.updateParams(value);
    this.updateChart.emit(value);
  }

  updateParams(value) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: value
    });
  }

  makeQuery(fieldName, value) {
    const query = [];
    for (let index = 0; index < this.filters.length; index++) {
      const item = this.filters[index].name;
      let currentField = fieldName.slice();
      if (item === fieldName) {
        if (fieldName === 'procedure' || fieldName === 'parameter') {
          currentField = `${item}Name`;
        }
        query.push({ name: currentField, value: value, wildcard: true });
        break;
      } else {
        currentField = item.slice();
        let currentValue = this.formGroup.controls[item].value
          ? this.formGroup.controls[item].value
          : '';
        if (item === 'procedure' || item === 'parameter') {
          currentField = `${currentField}ID`;
          currentValue = currentValue.split(' | ')[1];
        }
        query.push({
          name: currentField,
          value: currentValue,
          wildcard: false
        });
      }
    }
    return query;
  }

  getNextFilter(filter) {
    const filterIndex = this.filters.indexOf(filter);
    if (filterIndex + 1 < this.filters.length) {
      return this.filters[filterIndex + 1];
    }
    return null;
  }

  toggle() {
    if (this.editing) {
      this.formGroup.reset();
      this.formGroup.disable();
      this.updateParams({});
    } else if (!this.editing) {
      this.formGroup.controls[this.filters[0].name].enable();
      this.formGroup.controls[this.filters[0].name].setValue('');
      localStorage.setItem('filters', JSON.stringify(this.filters));
    }
  }

  changeVersion(event) {
    if (!this.formGroup.invalid) {
      this.update();
    }
  }
}
