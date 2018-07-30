import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberReturnedFilterComponent } from './number-returned-filter.component';

describe('NumberReturnedFilterComponent', () => {
  let component: NumberReturnedFilterComponent;
  let fixture: ComponentFixture<NumberReturnedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberReturnedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberReturnedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
