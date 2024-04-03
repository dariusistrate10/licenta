import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CartentryService } from 'src/app/services/cartentry.service';
import { CartEntry } from 'src/app/CartEntry';
import { Category } from 'src/app/Category';
import { ProductAttribute } from 'src/app/ProductAttribute';
import { ProductValue } from 'src/app/ProductValue';
import { User } from 'src/app/User';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/Cart';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {

  product!: Product;
  products: Product[] = [];
  faCart = faCartShopping;
  faCheck = faCheck;
  faArrowLeft = faArrowLeft;
  quantity!: number;
  productId!: number;
  cartId!: number;
  loggedUser: User = JSON.parse(localStorage.getItem('user') || 'null');
  // loggedUser: User = JSON.parse(sessionStorage.getItem('user') || 'null');
  foundCart: any = JSON.parse(localStorage.getItem('cart') || 'null');
  showModal: boolean = false;


  constructor(private productService: ProductService, private route: ActivatedRoute, private cartEntryService: CartentryService, private router: Router, private cartService: CartService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getProductById(params['id']));
    this.productService.getProducts().subscribe(produse => {
      this.products = produse;
      // console.log(this.products);
    })
  }

  addItemToCart(productId: number) {
    if(this.loggedUser) {
      this.cartEntryService.addCartEntry(this.foundCart.id, productId).subscribe();
    } else {
      // alert("You must sign in in order to add this item to cart");
      this.showModal = true;
      const elementBlur = this.elementRef.nativeElement.querySelector('.product-detail')
      elementBlur.style.filter = 'blur(8px)';
      // this.router.navigate(['/login']);
    }
  }

  getProductById(id:number) {
    this.productService.getProductId(id).subscribe(data => {
      this.product = data;
      // console.log(this.product);
    })
  }
}
