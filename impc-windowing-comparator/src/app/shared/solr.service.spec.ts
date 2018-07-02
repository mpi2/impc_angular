import { TestBed, inject } from '@angular/core/testing';

import { SolrService } from './solr.service';

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolrService]
    });
  });

  it('should be created', inject([SolrService], (service: SolrService) => {
    expect(service).toBeTruthy();
  }));
});
