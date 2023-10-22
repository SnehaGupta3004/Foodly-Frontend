import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRestaurantDishListComponent } from './customer-restaurant-dish-list.component';

describe('CustomerRestaurantDishListComponent', () => {
  let component: CustomerRestaurantDishListComponent;
  let fixture: ComponentFixture<CustomerRestaurantDishListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRestaurantDishListComponent]
    });
    fixture = TestBed.createComponent(CustomerRestaurantDishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
