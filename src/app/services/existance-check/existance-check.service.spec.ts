import { TestBed } from '@angular/core/testing';

import { ExistanceCheckService } from './existance-check.service';

describe('ExistanceCheckService', () => {
  let service: ExistanceCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistanceCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
