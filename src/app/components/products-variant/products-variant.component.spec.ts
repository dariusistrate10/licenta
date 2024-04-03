import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsVariantComponent } from './products-variant.component';

describe('ProductsVariantComponent', () => {
  let component: ProductsVariantComponent;
  let fixture: ComponentFixture<ProductsVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsVariantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
