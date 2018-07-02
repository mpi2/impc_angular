import { TestBed, inject } from '@angular/core/testing';

import { RawDataService } from './raw-data.service';

describe('RawDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RawDataService]
    });
  });

  it('should be created', inject([RawDataService], (service: RawDataService) => {
    expect(service).toBeTruthy();
  }));
});
