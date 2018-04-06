import { TestBed, inject } from '@angular/core/testing';

import { AlleleAutocompleteService } from './allele-autocomplete.service';

describe('AlleleAutocompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlleleAutocompleteService]
    });
  });

  it('should be created', inject([AlleleAutocompleteService], (service: AlleleAutocompleteService) => {
    expect(service).toBeTruthy();
  }));
});
