import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaigntableComponent } from './campaigntable.component';

describe('CampaigntableComponent', () => {
  let component: CampaigntableComponent;
  let fixture: ComponentFixture<CampaigntableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaigntableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaigntableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
