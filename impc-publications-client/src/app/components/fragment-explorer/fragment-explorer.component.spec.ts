import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentExplorerComponent } from './fragment-explorer.component';

describe('FragmentExplorerComponent', () => {
  let component: FragmentExplorerComponent;
  let fixture: ComponentFixture<FragmentExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
