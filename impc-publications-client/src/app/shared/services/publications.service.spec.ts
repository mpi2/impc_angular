import { TestBed, inject } from '@angular/core/testing';

import { PublicationsService } from './publications.service';

describe('PublicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicationsService]
    });
  });

  it('should be created', inject([PublicationsService], (service: PublicationsService) => {
    expect(service).toBeTruthy();
  }));
});
