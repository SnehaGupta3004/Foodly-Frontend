import { TestBed } from '@angular/core/testing';

import { RestaurantDishesService } from './restaurant-dishes.service';

describe('RestaurantDishesService', () => {
  let service: RestaurantDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
