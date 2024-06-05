import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AddressService} from "../../services/address.service";
import {ProductVariantService} from "../../services/product-variant.service";
import {OrderService} from "../../services/order.service";
import {PaymentService} from "../../services/payment.service";
import {MatTableDataSource} from '@angular/material/table';
import {ProductVariant} from "../../utils/ProductVariant";
import {User} from "../../utils/User";
import {Address} from "../../utils/Address";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Orders} from "../../utils/Orders";
import {Payment} from "../../utils/Payment";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public entities: string[] = ['Utilizatori', 'Adrese', 'Produse', 'Comenzi', 'Plati'];

  public selectedEntity: string = '';
  public usersDataSource = new MatTableDataSource<User>();
  public addressesDataSource = new MatTableDataSource<Address>();
  public productVariantsDataSource = new MatTableDataSource<ProductVariant>();
  public ordersDataSource = new MatTableDataSource<Orders>();
  public paymentsDataSource = new MatTableDataSource<Payment>();

  displayedColumnsUsers: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'defaultDeliveryAddress', 'defaultBillingAddress', 'actions'];
  displayedColumnsAddresses: string[] = ['id', 'streetLine', 'postalCode', 'city', 'country', 'actions'];
  displayedColumnsProductVariants: string[] = ['id', 'name', 'description', 'price', 'quantity', 'actions'];
  displayedColumnsOrders: string[] = ['id', 'paymentType', 'deliveryAddress', 'invoiceAddress', 'totalPrice', 'orderDate', 'actions'];
  displayedColumnsPayments: string[] = ['id', 'cardNumber', 'cardHolderName', 'expiryMonth', 'expiryYear', 'cvv', 'actions'];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private productVariantService: ProductVariantService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  fetchEntity(entity: string) {
    console.log(entity);
    this.selectedEntity = entity;

    switch (entity) {
      case 'Utilizatori':
        this.userService.getUsers().subscribe(data => {
          this.usersDataSource.data = data;
        });
        break;
      case 'Adrese':
        this.addressService.getAddresses().subscribe(data => {
          this.addressesDataSource.data = data;
        });
        break;
      case 'Produse':
        this.productVariantService.getProductVariants().subscribe(data => {
          this.productVariantsDataSource.data = data;
        });
        break;
      case 'Comenzi':
        this.orderService.getOrders().subscribe(data => {
          this.ordersDataSource.data = data;
        })
        break;
      case 'Plati':
        this.paymentService.getPayment().subscribe(data => {
          this.paymentsDataSource.data = data;
        })
        break;
      default:
        this.snackBar.open("A aparut o eroare!", "Inchideti", {
          duration: 5000,
        })
    }
  }

  displaySuccessMessage() {
    this.snackBar.open("Entitate stearsa cu succes!", "Inchideti", {
      duration: 5000
    })
  }

  deletePayment(id: number) {
    this.paymentService.deletePayment(id).subscribe(() => {
      this.displaySuccessMessage()
    })
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.displaySuccessMessage()
    })
  }

  deleteProductVariant(id: number) {
    this.productVariantService.deleteProductVariant(id).subscribe(() => {
      this.displaySuccessMessage()
    })
  }

  deleteAddress(id: number) {
    this.addressService.deleteAddress(id).subscribe(() => {
      this.displaySuccessMessage()
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.displaySuccessMessage()
    })
  }
}
