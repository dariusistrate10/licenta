import { Component, ElementRef, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/Product';
import { CartentryService } from 'src/app/services/cartentry.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  faSearch = faMagnifyingGlass;
  faCheck = faCheckCircle;
  filteredString: string = '';
  maxPrice: number = 100;

  constructor(private productService: ProductService, private cartEntriesService: CartentryService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.products = this.productService.products$;
  }

  filterProductsByPrice(maxPrice: number) {
    this.products.forEach((product: Product) => {
      console.log(product.price)
    });
  }

  applyFilter() {
    this.products = this.productService.getProductsByPrice(0, this.maxPrice*50)
  }

}
