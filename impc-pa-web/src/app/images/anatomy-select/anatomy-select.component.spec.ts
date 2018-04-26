import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomySelectComponent } from './anatomy-select.component';

describe('AnatomySelectComponent', () => {
  let component: AnatomySelectComponent;
  let fixture: ComponentFixture<AnatomySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnatomySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
