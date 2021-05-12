import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusesViewComponent } from './bonuses-view.component';

describe('BonusesViewComponent', () => {
  let component: BonusesViewComponent;
  let fixture: ComponentFixture<BonusesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
