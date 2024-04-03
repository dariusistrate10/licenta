import { TestBed } from '@angular/core/testing';

import { CartentryService } from './cartentry.service';

describe('CartentryService', () => {
  let service: CartentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
