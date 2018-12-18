import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioschemasMetadataComponent } from './bioschemas-metadata.component';

describe('BioschemasMetadataComponent', () => {
  let component: BioschemasMetadataComponent;
  let fixture: ComponentFixture<BioschemasMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioschemasMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioschemasMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
