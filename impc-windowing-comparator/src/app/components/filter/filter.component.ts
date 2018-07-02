import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { RawDataService } from './../../shared/raw-data.service';
import { SolrService } from './../../shared/solr.service';
import { Observable, pipe } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

class DynamycOptions {
    colonyID: Observable<any>;
    zygosity: Observable<any>;
    procedure: Observable<any>;
    parameter: Observable<any>;
    metadata: Observable<any>;
}

@Component({
    selector: 'impc-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    centerOptions = ['WTSI', 'MRC Harwell', 'HMGU', 'JAX', 'ICS', 'UC Davis', 'TCP', 'BCM', 'MARC', 'RBRC', 'KMPC', 'CMHD'];
    dynamicOptions = new DynamycOptions();
    formOrder = ['center', 'colonyID', 'zygosity', 'procedure', 'parameter', 'metadata'];
    formGroup: FormGroup;

    @Output() updateChart: EventEmitter<any> = new EventEmitter();
    @Output() invalid: EventEmitter<any> = new EventEmitter();

    constructor(private fb: FormBuilder, private solr: SolrService, private _router: Router, private _route: ActivatedRoute) {
        this.formGroup = this.fb.group({
            center: [null, Validators.required],
            colonyID: [{value: null, disabled: true}, Validators.required],
            zygosity: [{value: null, disabled: true}, Validators.required],
            procedure: [{value: null, disabled: true}, Validators.required],
            parameter: [{value: null, disabled: true}, Validators.required],
            metadata: [{value: null, disabled: true}, Validators.required]
        });
    }

    ngOnInit() {
        this._route.queryParams.pipe(first()).subscribe(value => {
            Object.keys(value).forEach( key => {
                if (key === 'zygosity') {
                    this.dynamicOptions.zygosity = this.solr.query(this.makeQuery('zygosity', ''), 'zygosity');
                }
                this.formGroup.controls[key].setValue(value[key]);
                this.formGroup.controls[key].enable();
            });
            if (this.formGroup.valid) {
                this.updateChart.emit(this.formGroup.value);
            }
        });
        for (let index = 0; index < this.formOrder.length; index++) {
            const fieldName = this.formOrder[index];
            this.formGroup.controls[fieldName].valueChanges.subscribe( text => {
                if (index < this.formOrder.length - 1) {
                    const nextFieldName = this.formOrder[index + 1];
                    this.formGroup.controls[nextFieldName].setValue('');
                }
                const pivot = fieldName === 'procedure' || fieldName === 'parameter' ? `${fieldName}_stable_id,${fieldName}_name` : null;
                this.dynamicOptions[fieldName] = this.solr.query(this.makeQuery(fieldName, text), fieldName, pivot);
            });
        }
        this.formGroup.statusChanges.subscribe(status => { if (status === 'INVALID') { this.invalid.emit(status); } });
    }

    selected(nextControlName) {
        this.formGroup.controls[nextControlName].setValue('');
        this.formGroup.controls[nextControlName].enable();
        if (nextControlName === 'zygosity') {
            this.dynamicOptions.zygosity = this.solr.query(this.makeQuery('zygosity', ''), 'zygosity');
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
            queryParamsHandling: 'merge',
        });
    }

    makeQuery(fieldName, value) {
        const query = [];
        for (let index = 0; index <=  this.formOrder.indexOf(fieldName); index++) {
            let item = this.formOrder[index];
            if (item === fieldName) {
                if (item === 'procedure' || item === 'parameter') {
                    item = `${item}Name`;
                }
                query.push({name: item, value: value, wildcard: true});
                return query;
            } else {
                let currentField = item;
                let currentValue = this.formGroup.controls[item].value;
                if (item === 'procedure' || item === 'parameter') {
                    currentField = `${currentField}ID`;
                    currentValue = currentValue.split(' | ')[1];
                }
                query.push({name: currentField, value: currentValue, wildcard: false});
            }
        }
    }
}
