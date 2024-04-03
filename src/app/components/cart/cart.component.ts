import { Component, ElementRef, OnInit } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CartentryService } from 'src/app/services/cartentry.service';
import { BehaviorSubject, Observable, count, filter, map, switchMap } from 'rxjs';
import { CartEntry } from 'src/app/CartEntry';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/Payment';
import { OrderService } from 'src/app/services/order.service';
import { User } from 'src/app/User';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productEntries: any = [];
  userProducts: any = [];
  isShowDeliveryForm = false;
  isShowPaymentForm = false;
  showModal: boolean = false;
  cardHolderNameInputError: boolean = false;
  cardNumberInputError: boolean = false;
  expiryMonthInputError: boolean = false;
  expiryYearInputError: boolean = false;
  cvvInputError: boolean = false;
  productCounter: number = 0;
  faPayment = faCreditCard;
  faCheck = faCheckCircle;
  faDelivery = faTruckFast;
  faCart = faCartShopping;
  faTrash = faTrash;
  faPlus = faSquarePlus;
  faMinus = faSquareMinus;
  faUser = faUser;
  faPhone = faPhone;
  faMail = faEnvelope;
  faHome = faHome;
  cartEntries$: BehaviorSubject<CartEntry[]> = new BehaviorSubject<CartEntry[]>([]);
  cartTotal$!: Observable<number>;
  cartTotal!: number;
  cartQuantity$!: Observable<number>;
  loggedUser: any = JSON.parse(localStorage.getItem('user') || 'null');
  // loggedUser: User = JSON.parse(sessionStorage.getItem('user') || 'null');
  foundCart: any = JSON.parse(localStorage.getItem('cart') || 'null');
  cardNumber!: string;
  cardHolderName!: string;
  expiryMonth!: string;
  expiryYear!: string;
  cvv!: string;

  constructor(private cartEntryService: CartentryService, private router: Router, private paymentService: PaymentService, private orderService: OrderService, private cartService: CartService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.loggedUser)
    if(this.loggedUser) {
      this.cartService.findCartByUserId(this.loggedUser.id).subscribe((data) => {
        console.log(data)
        this.foundCart = data;
        localStorage.setItem('cart', JSON.stringify(this.foundCart))
      });
    }
    // console.log(this.loggedUser.id)
    if(this.foundCart) {
      // this.cartEntryService.getSpecificCartEntry(this.foundCart.id).subscribe(data =>{
      //   // console.log(data)
      //   this.userProducts = data;
      // })
      this.cartEntryService.getCartEntry(this.foundCart.id).subscribe((cartEntries) => {
        this.cartEntries$.next(cartEntries)
        this.productCounter = cartEntries.length
        console.log(this.productCounter)
        console.log(cartEntries)
      })
      this.cartTotal$ = this.cartEntries$.pipe(
        map((cartEntries) =>
          cartEntries.reduce(
            (total, cartEntry) =>
              total + (cartEntry.productVariants.reduce((sum, product) => sum + product.price, 0) * cartEntry.quantity),
            0
          )
        )
      );
      // this.cartTotal$ = this.cartEntries$.pipe(
      //   map((cartEntries) => cartEntries.map(cartEntry => cartEntry.product?.price ?? 0).reduce((entry1,entry2) => entry1 + entry2,0))
      // )
      this.productEntries = this.cartEntryService.cartEntries$;
    }
    // this.cartEntryService.getCartEntry().subscribe((cartEntries) => {
    //   this.cartEntries$.next(cartEntries)
    //   console.log(cartEntries)
    // })
    // this.cartTotal$ = this.cartEntries$.pipe(
    //   map((cartEntries) => cartEntries.map(cartEntry => cartEntry.product?.price ?? 0).reduce((entry1,entry2) => entry1 + entry2,0))
    // )
    // this.productEntries = this.cartEntryService.cartEntries$;
    // this.cartTotal$ = this.cartEntryService.cartEntries$.pipe(
    //   map((cartEntries) => cartEntries.map(cartEntry => cartEntry.products?.price ?? 0).reduce((entry1,entry2) => entry1 + entry2,0))
    // )
  }

  deleteCartEntry(productId: number) {
    console.log(productId);
    this.cartEntryService.deleteCartEntry(productId).subscribe();
    window.location.reload();
  }

  incrementQuantity(productEntry: CartEntry) {
    productEntry.quantity++;
    // console.log(productEntry.product.price*productEntry.quantity)
    this.cartEntryService.updateCartEntry(productEntry.id, productEntry.quantity).subscribe();
    window.location.reload();
  }

  decrementQuantity(productEntry: CartEntry) {
    productEntry.quantity--;
    this.cartEntryService.updateCartEntry(productEntry.id, productEntry.quantity).subscribe();
    window.location.reload();
    if(productEntry.quantity < 1) {
      alert("Discard item from cart?")
      this.cartEntryService.deleteCartEntry(productEntry.id).subscribe();
      window.location.reload();
    }
  }

  toggleDeliveryForm() {
    if(this.loggedUser) {
      this.isShowDeliveryForm = true;
    } else {
      this.showModal = true;
      const elementBlur = this.elementRef.nativeElement.querySelector('.cart-container')
      elementBlur.style.filter = 'blur(8px)';
      // this.router.navigate(['/login'])
    }
  }

  togglePaymentForm() {
    if(this.loggedUser) {
      this.isShowPaymentForm = true;
    } else {
      // alert('Login or Register to place an order!');
      this.showModal = true;
      const elementBlur = this.elementRef.nativeElement.querySelector('.cart-container')
      elementBlur.style.filter = 'blur(8px)';
      // this.router.navigate(['/login'])
    }
  }

  checkout() {
    if(this.loggedUser) {
      if(!this.cardNumber) {
        console.log("error")
        this.cardNumberInputError = true;
      } else { this.cardNumberInputError = false } if(!this.cardHolderName) {
        this.cardHolderNameInputError = true;
      } else { this.cardHolderNameInputError = false } if(!this.expiryMonth) {
        this.expiryMonthInputError = true;
      } else { this.expiryMonthInputError = false } if(!this.expiryYear) {
        this.expiryYearInputError = true;
      } else { this.expiryYearInputError = false } if(!this.cvv) {
        this.cvvInputError = true;
      } else { this.cvvInputError = false }
      
      if(this.cardNumber && this.cardHolderName && this.expiryMonth && this.expiryYear && this.cvv) {
        const payment: Payment = {
          // id: Math.random(),
          cardNumber: this.cardNumber,
          cardHolderName: this.cardHolderName,
          expiryMonth: this.expiryMonth,
          expiryYear: this.expiryYear,
          cvv: this.cvv,
        }
        console.log(payment)
        console.log(this.loggedUser.id)
        console.log(this.foundCart.id)
        if(payment) {
          this.orderService.addOrder(payment, this.loggedUser.id, this.foundCart.id).subscribe();
          setTimeout(() => {this.cartEntryService.deleteAllCartEntries(this.foundCart.id).subscribe()}, 3000)
          this.router.navigate(['/success'])
        } 
      }
    } else {
      alert('Login or Register to place an order!');
      this.router.navigate(['/login'])
    }
  }

  goCheckout() {
    document.getElementById("targetCheckout")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })
  }

  goDelivery() {
    document.getElementById("targetDelivery")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })
  }

  goPayment() {
    document.getElementById("targetPayment")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })
  }

}
