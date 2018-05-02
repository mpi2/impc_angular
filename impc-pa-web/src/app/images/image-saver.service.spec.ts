import { TestBed, inject } from '@angular/core/testing';

import { ImageSaverService } from './image-saver.service';

describe('ImageSaverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageSaverService]
    });
  });

  it('should be created', inject([ImageSaverService], (service: ImageSaverService) => {
    expect(service).toBeTruthy();
  }));
});
