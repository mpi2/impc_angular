import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationKeywordListComponent } from './publication-keyword-list.component';

describe('PublicationKeywordListComponent', () => {
  let component: PublicationKeywordListComponent;
  let fixture: ComponentFixture<PublicationKeywordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationKeywordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationKeywordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
