import { TestBed } from '@angular/core/testing';

import { GcartService } from './gcart.service';

describe('GcartService', () => {
  let service: GcartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GcartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
