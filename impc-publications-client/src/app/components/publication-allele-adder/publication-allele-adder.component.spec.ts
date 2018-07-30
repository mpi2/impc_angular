import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationAlleleAdderComponent } from './publication-allele-adder.component';

describe('PublicationAlleleAdderComponent', () => {
  let component: PublicationAlleleAdderComponent;
  let fixture: ComponentFixture<PublicationAlleleAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationAlleleAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationAlleleAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
