import { TestBed } from '@angular/core/testing';

import { ProductVariantAttributeValueService } from './product-variant-attribute-value.service';

describe('ProductVariantAttributeValueService', () => {
  let service: ProductVariantAttributeValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVariantAttributeValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
