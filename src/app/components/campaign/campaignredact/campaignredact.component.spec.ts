import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignredactComponent } from './campaignredact.component';

describe('CampaignredactComponent', () => {
  let component: CampaignredactComponent;
  let fixture: ComponentFixture<CampaignredactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignredactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignredactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
