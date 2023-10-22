import { TestBed } from '@angular/core/testing';

import { CutomerPageService } from './customer-page.service';

describe('CutomerPageService', () => {
  let service: CutomerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutomerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
