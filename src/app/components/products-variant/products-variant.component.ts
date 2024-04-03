import { Component, ElementRef, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ProductVariant } from 'src/app/utils/ProductVariant';
import { ProductVariantService } from 'src/app/services/product-variant.service';

@Component({
  selector: 'app-products-variant',
  templateUrl: './products-variant.component.html',
  styleUrls: ['./products-variant.component.css']
})
export class ProductsVariantComponent implements OnInit {

  productVariants: any = []
  maxPrice: number = 100
  filteredString: string = '';
  faSearch = faMagnifyingGlass;

  constructor(private productVariantService: ProductVariantService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.productVariants = this.productVariantService.productVariants$;
  }

  applyFilter() {
    const categoryLaptop = this.elementRef.nativeElement.querySelector('#laptop')
    const categoryPhone = this.elementRef.nativeElement.querySelector('#phone')
    const categoryHeadphones = this.elementRef.nativeElement.querySelector('#headphone')

    this.productVariants = this.productVariantService.getProductVariantsByPrice(0, this.maxPrice*50)

    if(categoryHeadphones.checked === true) {
      this.productVariants = this.productVariantService.getProductVariantsByCategory(categoryHeadphones.value);
    }
    if(categoryLaptop.checked === true) {
      this.productVariants = this.productVariantService.getProductVariantsByCategory(categoryLaptop.value);
    }
    if(categoryPhone.checked === true) {
      this.productVariants = this.productVariantService.getProductVariantsByCategory(categoryPhone.value);
    }
  }

}
