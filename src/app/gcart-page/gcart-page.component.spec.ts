import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcartPageComponent } from './gcart-page.component';

describe('GcartPageComponent', () => {
  let component: GcartPageComponent;
  let fixture: ComponentFixture<GcartPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GcartPageComponent]
    });
    fixture = TestBed.createComponent(GcartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
