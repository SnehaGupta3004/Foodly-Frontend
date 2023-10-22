import { TestBed } from '@angular/core/testing';

import { RestaurantDishesReceipesService } from './restaurant-dishes-receipes.service';

describe('RestaurantDishesReceipesService', () => {
  let service: RestaurantDishesReceipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantDishesReceipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
