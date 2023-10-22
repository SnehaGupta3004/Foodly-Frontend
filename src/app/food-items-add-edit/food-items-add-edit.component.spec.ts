import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemsAddEditComponent } from './food-items-add-edit.component';

describe('FoodItemsAddEditComponent', () => {
  let component: FoodItemsAddEditComponent;
  let fixture: ComponentFixture<FoodItemsAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodItemsAddEditComponent]
    });
    fixture = TestBed.createComponent(FoodItemsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
