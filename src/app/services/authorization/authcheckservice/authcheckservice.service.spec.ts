import { TestBed } from '@angular/core/testing';

import { AuthcheckserviceService } from './authcheckservice.service';

describe('AuthcheckserviceService', () => {
  let service: AuthcheckserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthcheckserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
