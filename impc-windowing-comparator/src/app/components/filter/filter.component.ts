import { ActivatedRoute, Router } from '@angular/router';
import { RawDataService } from './../../shared/raw-data.service';
import { SolrService } from './../../shared/solr.service';
import { Observable, pipe } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
export class FilterComponent implements OnInit {
    dynamicOptions = new DynamycOptions();
    filters = [
        { name: 'center', type: 'select', title: 'Center' },
        { name: 'alleleSymbol', type: 'autocomplete', title: 'Allele Symbol' },
        { name: 'colonyID', type: 'autocomplete', title: 'Colony ID' },
        { name: 'zygosity', type: 'select', title: 'Zygosity' },
        { name: 'procedure', type: 'autocomplete', title: 'Procedure' },
        { name: 'parameter', type: 'autocomplete', title: 'Parameter' },
        { name: 'metadata', type: 'none', title: 'Metadata' }
    ];
    formGroup: FormGroup;
    editing = false;

    @Output()
    updateChart: EventEmitter<any> = new EventEmitter();
    @Output()
    invalid: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private solr: SolrService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.formGroup = this.fb.group({
            alleleSymbol: [{ value: null, disabled: true }, Validators.required],
            colonyID: [{ value: null, disabled: true }, Validators.required],
            procedure: [{ value: null, disabled: true }, Validators.required],
            parameter: [{ value: null, disabled: true }, Validators.required],
            center: [{ value: null, disabled: true }, Validators.required],
            zygosity: [{ value: null, disabled: true }, Validators.required],
            metadata: [{ value: null, disabled: true }, Validators.required]
        });
        this.filters = localStorage.getItem('filters') ? JSON.parse(localStorage.getItem('filters')) : this.filters;
    }

    ngOnInit() {
        this._route.queryParams.pipe(first()).subscribe(value => {
            this.filters.forEach(filter => {
                const key = filter.name;
                if (value[key] === null) {
                    return;
                }
                if (key === 'zygosity' || key === 'center') {
                    this.dynamicOptions[key] = this.solr.query(
                        this.makeQuery(key, ''),
                        key
                    );
                }
                this.formGroup.controls[key].setValue(value[key]);
                this.formGroup.controls[key].enable();
            });
            if (this.formGroup.valid) {
                this.updateChart.emit(this.formGroup.value);
            }
        });
        this.filters.filter(item => item.type !== 'none').forEach(filter => {
            this.formGroup.controls[filter.name].valueChanges.subscribe(text => {
                const nextFieldName = this.getNextField(filter.name);
                if (this.formGroup.controls[nextFieldName].valid) {
                    this.formGroup.controls[nextFieldName].setValue('');
                }
                let pivot = null;
                if (filter.name === 'parameter') {
                    pivot = `${filter.name}_stable_id,${filter.name}_name`;
                } else if (filter.name === 'procedure') {
                    pivot = `${filter.name}_group,${filter.name}_name`;
                }
                if (filter.type === 'autocomplete') {
                    this.dynamicOptions[filter.name] = this.solr.query(
                        this.makeQuery(filter.name, text),
                        filter.name,
                        pivot
                    );
                } else if (text === '') {
                    this.dynamicOptions[filter.name] = this.solr.query(
                        this.makeQuery(filter.name, ''),
                        filter.name
                    );
                }
            });
        });
        if (!this.formGroup.valid) {
            this.formGroup.controls[this.filters[0].name].enable();
            this.formGroup.controls[this.filters[0].name].setValue('');
        }
        this.formGroup.statusChanges.subscribe(status => {
            if (status === 'INVALID') {
                this.invalid.emit(status);
            }
        });
    }

    selected(i) {
        const nextControlName = this.getNextField(this.filters[i].name);
        this.formGroup.controls[nextControlName].setValue('');
        this.formGroup.controls[nextControlName].enable();
        if (nextControlName === 'metadata') {
            this.solr
            .query(this.makeQuery('metadata', ''), 'metadata')
            .toPromise()
            .then(result => {
                this.formGroup.controls['metadata'].setValue(result.join(','));
                this.update();
            });
        }
        this.updateParams();
    }

    update() {
        this.updateParams();
        const value = this.formGroup.value;
        this.updateChart.emit(value);
    }

    updateParams() {
        this._router.navigate([], {
            relativeTo: this._route,
            queryParams: this.formGroup.value,
            queryParamsHandling: 'merge'
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
                let currentValue = this.formGroup.controls[item].value ? this.formGroup.controls[item].value : '';
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

    getNextField(fieldName) {
        for (let index = 0; index < this.filters.length; index++) {
            const filter = this.filters[index];
            if (fieldName === filter.name) {
                return this.filters[index + 1]
                ? this.filters[index + 1].name
                : 'metadata';
            }
        }
    }

    toggle() {
        if (this.editing) {
            this.formGroup.reset();
            this.formGroup.disable();
            this.updateParams();
        } else if (!this.editing) {
            this.formGroup.controls[this.filters[0].name].enable();
            this.formGroup.controls[this.filters[0].name].setValue('');
            localStorage.setItem('filters', JSON.stringify(this.filters));
        }
    }
}
