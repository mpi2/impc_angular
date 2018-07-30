import { TestBed, inject } from '@angular/core/testing';

import { FragmentsService } from './fragments.service';

describe('FragmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FragmentsService]
    });
  });

  it('should be created', inject([FragmentsService], (service: FragmentsService) => {
    expect(service).toBeTruthy();
  }));
});
