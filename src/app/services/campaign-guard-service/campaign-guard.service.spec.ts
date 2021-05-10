import { TestBed } from '@angular/core/testing';

import { CampaignGuardService } from './campaign-guard.service';

describe('CampaignGuardService', () => {
  let service: CampaignGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
