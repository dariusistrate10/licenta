import {Component, ElementRef, OnInit} from '@angular/core';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {faTruckFast} from '@fortawesome/free-solid-svg-icons';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faSquarePlus} from '@fortawesome/free-solid-svg-icons';
import {faSquareMinus} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {CartentryService} from 'src/app/services/cartentry.service';
import {BehaviorSubject, Observable, count, filter, map, switchMap} from 'rxjs';
import {CartEntry} from 'src/app/utils/CartEntry';
import {Router} from '@angular/router';
import {PaymentService} from 'src/app/services/payment.service';
import {AddEditPayment, Payment} from 'src/app/utils/Payment';
import {OrderService} from 'src/app/services/order.service';
import {User} from 'src/app/utils/User';
import {CartService} from 'src/app/services/cart.service';
import {Cart} from 'src/app/utils/Cart';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import emailjs, {EmailJSResponseStatus} from "@emailjs/browser";
import {DatePipe} from "@angular/common";

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
  foundCart: any = JSON.parse(localStorage.getItem('cart') || 'null');
  cardNumber!: string;
  cardHolderName!: string;
  expiryMonth!: string;
  expiryYear!: string;
  cvv!: string;

  protected form = new FormGroup<AddEditPayment>({
    cardNumber: new FormControl(null, [Validators.required, Validators.minLength(0), Validators.maxLength(16)]),
    cardHolderName: new FormControl(null, Validators.required),
    expiryYear: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    expiryMonth: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    cvv: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)])
  })

  protected streetLine!: string
  protected postalCode!: string
  protected country!: string
  protected city!: string
  protected products!: any[]

  constructor(private cartEntryService: CartentryService,
              private router: Router,
              private paymentService: PaymentService,
              private orderService: OrderService,
              private cartService: CartService,
              private elementRef: ElementRef,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loggedUser.addresses.map((entry: any) => {
      this.streetLine = entry.streetLine
      this.postalCode = entry.postalCode
      this.country = entry.country
      this.city = entry.city
    })
    if (this.loggedUser) {
      this.cartService.findCartByUserId(this.loggedUser.id).subscribe((data) => {
        this.foundCart = data;
        localStorage.setItem('cart', JSON.stringify(this.foundCart))
      });
    }
    if (this.foundCart) {
      this.cartEntryService.getCartEntry(this.foundCart.id).subscribe((cartEntries) => {
        this.cartEntries$.next(cartEntries)
        this.productCounter = cartEntries.length
      })
      this.cartTotal$ = this.cartEntries$.pipe(
        map((cartEntries) => cartEntries.reduce((total, cartEntry) => total + (cartEntry.productVariants.reduce((sum, product) => sum + product.price, 0) * cartEntry.quantity), 0))
      );
      this.productEntries = this.cartEntryService.cartEntries$;
    }
  }

  getCartDetailsString(): string {
    let cartDetails = '';
    this.cartEntries$.value.forEach(cartEntry => {
      cartEntry.productVariants.forEach(product => {
        cartDetails += `Nume: ${product.name}, Pret: ${product.price}, Cantitate: ${cartEntry.quantity}\n`;
      });
    });
    return cartDetails;
  }

  deleteCartEntry(productId: number) {
    this.cartEntryService.deleteCartEntry(productId).subscribe();
    window.location.reload();
  }

  incrementQuantity(productEntry: CartEntry) {
    productEntry.quantity++;
    this.cartEntryService.updateCartEntry(productEntry.id, productEntry.quantity).subscribe();
    window.location.reload();
  }

  decrementQuantity(productEntry: CartEntry) {
    productEntry.quantity--;
    this.cartEntryService.updateCartEntry(productEntry.id, productEntry.quantity).subscribe();
    window.location.reload();
    if (productEntry.quantity < 1) {
      alert("Discard item from cart?")
      this.cartEntryService.deleteCartEntry(productEntry.id).subscribe();
      window.location.reload();
    }
  }

  toggleDeliveryForm() {
    if (this.loggedUser) {
      this.isShowDeliveryForm = true;
    } else {
      this.showModal = true;
      const elementBlur = this.elementRef.nativeElement.querySelector('.cart-container')
      elementBlur.style.filter = 'blur(8px)';
    }
  }

  togglePaymentForm() {
    if (this.loggedUser) {
      this.isShowPaymentForm = true;
    } else {
      this.showModal = true;
      const elementBlur = this.elementRef.nativeElement.querySelector('.cart-container')
      elementBlur.style.filter = 'blur(8px)';
    }
  }

  public placeOrder() {
    if (this.form.valid) {
      this.cartTotal$.subscribe(total => {
        this.cartTotal = total;
      });
      let orderNumber = Math
      let number: any = Math.random() * 100000000;

      const payment = this.form.value as Payment
      if (this.loggedUser) {
        if (this.form.valid) {
          const emailData = {
            fullName: `${this.loggedUser.firstName} ${this.loggedUser.lastName}`,
            firstName: this.loggedUser.firstName,
            orderNumber: orderNumber.trunc(number),
            orderDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy')?.replaceAll('-', '.'),
            products: this.getCartDetailsString(),
            cartTotal: this.cartTotal,
            streetLine: this.streetLine,
            city: this.city,
            postalCode: this.postalCode,
            country: this.country,
            deliveryType: 'Curier',
            companyEmail: 'suport@zonaac.ro',
            companyPhone: '0744505856',
            companyName: 'Zona AC'
          }
          this.orderService.addOrder(payment, this.loggedUser.id, this.foundCart.id).subscribe(data => {
            emailjs.send('service_73xdu79', 'template_h3sa6vm', emailData, 'PChICTTWfichmk82y')
            setTimeout(() => {
              this.cartEntryService.deleteAllCartEntries(this.foundCart.id).subscribe()
            }, 3000)
            this.router.navigate(['/success'])
          })
        } else {
          this.snackBar.open("Formular invalid!", "Inchideti", {
            duration: 5000
          })
        }
      }
    } else {
      this.snackBar.open("Formular invalid!", "Inchideti", {
        duration: 4000,
        panelClass: ['error']
      })
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
