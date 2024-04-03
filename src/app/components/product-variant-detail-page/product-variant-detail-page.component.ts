import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductVariant } from 'src/app/ProductVariant';
import { ProductVariantService } from 'src/app/services/product-variant.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/User';
import { CartentryService } from 'src/app/services/cartentry.service';
import { ProductVariantAttributeValueService } from 'src/app/services/product-variant-attribute-value.service';

@Component({
  selector: 'app-product-variant-detail-page',
  templateUrl: './product-variant-detail-page.component.html',
  styleUrls: ['./product-variant-detail-page.component.css']
})
export class ProductVariantDetailPageComponent implements OnInit {

  product!: ProductVariant;
  products!: any[];
  productVariantAttributeValues!: any
  faCart = faCartShopping;
  faCheck = faCheck;
  faArrowLeft = faArrowLeft;
  showModal: boolean = false;
  loggedUser: User = JSON.parse(localStorage.getItem('user') || 'null');
  foundCart: any = JSON.parse(localStorage.getItem('cart') || 'null');

  constructor(private productVariantService: ProductVariantService, private route: ActivatedRoute, private cartEntryService: CartentryService, private elementRef: ElementRef, private productVariantAttributeValueService: ProductVariantAttributeValueService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getProductVariantById(params['id']));
    this.productVariantService.getProductVariants().subscribe(data => {
      this.products = data;
      console.log(data)
    })
    this.productVariantAttributeValueService.getProductVariantAttributeValues().subscribe((data) => {
      this.productVariantAttributeValues = data;
      console.log(this.productVariantAttributeValues)
    })
  }

  addItemToCart(productVariantId: number) {
    if(this.loggedUser) {
      this.cartEntryService.addCartEntryVariant(this.foundCart.id, productVariantId).subscribe();
    } else {
      // alert("You must sign in in order to add this item to cart");
      this.showModal = true;
      const elementBlur = this.elementRef.nativeElement.querySelector('.product-detail')
      elementBlur.style.filter = 'blur(8px)';
      // this.router.navigate(['/login']);
    }
  }

  getProductVariantById(id: number) {
    this.productVariantService.getProductVariantId(id).subscribe(data => {
      this.product = data;
    })
  }

  // getProductVariantAttributeValues() {
  //   this.productVariantAttributeValueService.getProductVariantAttributeValues().subscribe((data) => {
  //     console.log(data)
  //   })
  // }
}
