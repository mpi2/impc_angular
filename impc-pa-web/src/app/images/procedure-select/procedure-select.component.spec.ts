import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureSelectComponent } from './procedure-select.component';

describe('ProcedureSelectComponent', () => {
  let component: ProcedureSelectComponent;
  let fixture: ComponentFixture<ProcedureSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
