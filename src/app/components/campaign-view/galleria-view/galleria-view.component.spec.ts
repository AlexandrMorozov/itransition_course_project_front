import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriaViewComponent } from './galleria-view.component';

describe('GalleriaViewComponent', () => {
  let component: GalleriaViewComponent;
  let fixture: ComponentFixture<GalleriaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleriaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
