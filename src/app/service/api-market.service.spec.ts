import { TestBed } from '@angular/core/testing';

import { ApiMarketService } from './api-market.service';

describe('ApiMarketService', () => {
  let service: ApiMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
