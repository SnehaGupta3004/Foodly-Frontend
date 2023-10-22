import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryComponent } from './grocery.component';

describe('GroceryComponent', () => {
  let component: GroceryComponent;
  let fixture: ComponentFixture<GroceryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryComponent]
    });
    fixture = TestBed.createComponent(GroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
