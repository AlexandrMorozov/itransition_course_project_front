import { TestBed } from '@angular/core/testing';

import { UserContentGuardService } from './user-content-guard.service';

describe('ContentGuardService', () => {
  let service: UserContentGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserContentGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
