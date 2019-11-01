import { TestBed, inject } from '@angular/core/testing';

import { DmtserviceService } from './dmtservice.service';

describe('DmtserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DmtserviceService]
    });
  });

  it('should be created', inject([DmtserviceService], (service: DmtserviceService) => {
    expect(service).toBeTruthy();
  }));
});
