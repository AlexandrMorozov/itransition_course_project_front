import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonustableComponent } from './bonustable.component';

describe('BonustableComponent', () => {
  let component: BonustableComponent;
  let fixture: ComponentFixture<BonustableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonustableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonustableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
