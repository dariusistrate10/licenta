import { Component, ElementRef, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductVariant } from 'src/app/utils/ProductVariant';
import { ProductVariantService } from 'src/app/services/product-variant.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/utils/User';
import { CartentryService } from 'src/app/services/cartentry.service';
import { ProductVariantAttributeValueService } from 'src/app/services/product-variant-attribute-value.service';
import {Subscription} from "rxjs";
import {Review} from "../../utils/Review";

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
  protected productId!: number;
  protected reviews!: Review[]

  constructor(private productVariantService: ProductVariantService,
              private route: ActivatedRoute,
              private cartEntryService: CartentryService,
              private elementRef: ElementRef,
              private productVariantAttributeValueService: ProductVariantAttributeValueService,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id']
    })
    this.route.params.subscribe(params => this.getProductVariantById(params['id']));
    this.productVariantService.getProductVariants().subscribe(data => {
      this.products = data;
    })
    this.productVariantAttributeValueService.getProductVariantAttributeValues().subscribe((data) => {
      this.productVariantAttributeValues = data;
    })
    this.productVariantService.getReviewsByProductVariantId(this.productId).subscribe(data => {
      this.reviews = data
    })
  }

  addItemToCart(productVariantId: number) {
    if(this.loggedUser) {
      this.cartEntryService.addCartEntryVariant(this.foundCart.id, productVariantId).subscribe();
    } else {
      this.showModal = true;
      const elementBlur = this.elementRef.nativeElement.querySelector('.product-detail')
      elementBlur.style.filter = 'blur(8px)';
    }
  }

  getProductVariantById(id: number) {
    this.productVariantService.getProductVariantId(id).subscribe(data => {
      this.product = data;
    })
  }

  addReview() {
    this.router.navigate([`/review/${this.productId}`])
  }
}
