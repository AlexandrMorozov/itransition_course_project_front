import { TestBed } from '@angular/core/testing';

import { CampaignViewService } from './campaign-view.service';

describe('CampaignViewService', () => {
  let service: CampaignViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
