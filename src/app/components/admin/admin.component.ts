import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AddressService} from "../../services/address.service";
import {ProductVariantService} from "../../services/product-variant.service";
import {OrderService} from "../../services/order.service";
import {PaymentService} from "../../services/payment.service";
import {MatTableDataSource} from '@angular/material/table';
import {AddEditProductVariantForm, ProductVariant} from "../../utils/ProductVariant";
import {AddEditUser, AddEditUserPostDTO, User, UserPostDTO} from "../../utils/User";
import {AddEditAddress, Address, AddressEditDTO, AddressPostDTO} from "../../utils/Address";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Orders} from "../../utils/Orders";
import {Payment} from "../../utils/Payment";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EditUserFormData, EditUserFormDialogComponent} from "../edit-user-form-dialog/edit-user-form-dialog.component";
import {
  EditAddressFormData,
  EditAddressFormDialogComponent
} from "../edit-address-form-dialog/edit-address-form-dialog.component";
import {
  EditProductVariantFormData,
  EditProductVariantFormDialogComponent
} from "../edit-product-variant-form-dialog/edit-product-variant-form-dialog.component";
import {user} from "@angular/fire/auth";

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  fetchEntity(entity: string) {
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

  addUser(formGroup: FormGroup<AddEditUser>) {
    const user = formGroup.value as UserPostDTO
    let userToAdd = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      defaultDeliveryAddress: user.defaultDeliveryAddress,
      defaultBillingAddress: user.defaultBillingAddress,
      addresses: [user.addresses]
    } as unknown as User

    let newAddress: Address = {
      streetLine: 'addedForTest',
      postalCode: 'addedForTest',
      city: 'addedForTest',
      country: 'addedForTest'
    }

    userToAdd = {...userToAdd, addresses: [newAddress]}

    this.userService.addUser(userToAdd, newAddress).subscribe(() => {
      this.snackBar.open("Entitate adaugata cu succes!", "Inchideti", {
        duration: 4000,
        panelClass: ['success']
      })
    })
  }

  editUser(formGroup: FormGroup<AddEditUser>) {
    const user = formGroup.value as UserPostDTO
    this.userService.updateUser(formGroup.controls.id.value!, user).subscribe(() => {
      this.snackBar.open("Formular actualizat cu succes!", "Inchideti", {
        duration: 4000,
        panelClass: ['success']
      })
    })
  }

  updateUser(id: number) {
    this.userService.getUserById(id).subscribe(data => {
      let streetLine!: string
      let country!: string
      let city!: string
      let postalCode!: string
      if (data.addresses) {
        data.addresses.map((entry) => {
          streetLine = entry.streetLine
          country = entry.country
          city = entry.city
          postalCode = entry.postalCode
        })
      }
      const form = new FormGroup<AddEditUser>({
        id: new FormControl(data.id!),
        firstName: new FormControl(data.firstName),
        lastName: new FormControl(data.lastName),
        email: new FormControl(data.email),
        password: new FormControl(data.password),
        defaultBillingAddress: new FormControl(data.defaultBillingAddress),
        defaultDeliveryAddress: new FormControl(data.defaultDeliveryAddress),
        phoneNumber: new FormControl(data.phoneNumber),
        role: new FormControl(data.role!),
        addresses: new FormControl(data.addresses!)
        // streetLine: new FormControl(streetLine),
        // city: new FormControl(city),
        // country: new FormControl(country),
        // postalCode: new FormControl(postalCode)
      })
      const text: string = `Editati utilizatorul`;
      this.dialog.open<EditUserFormDialogComponent, EditUserFormData>(EditUserFormDialogComponent,
        {
          data: {
            callback: this.editUser.bind(this),
            text: text,
            args: [],
            form
          }
        });
    })
  }

  addAddress(formGroup: FormGroup<AddEditAddress>) {
    const address = formGroup.value as AddressEditDTO
    this.addressService.addAddress(address).subscribe(() => {
      this.snackBar.open("Adresa adaugata cu succes!", "Inchideti", {
        duration: 4000,
        panelClass: ['success']
      })
    })
  }

  editAddress(formGroup: FormGroup<AddEditAddress>) {
    const address = formGroup.value as AddressEditDTO
    this.addressService.updateAddress(address.id, address).subscribe(() => {
      this.snackBar.open("Formular actualizat cu succes!", "Inchideti", {
        duration: 4000,
        panelClass: ['success']
      })
    })
  }

  updateAddress(id: number) {
    this.addressService.getAddressById(id).subscribe(data => {
      const form = new FormGroup<AddEditAddress>({
        id: new FormControl(data.id!),
        streetLine: new FormControl(data.streetLine),
        postalCode: new FormControl(data.postalCode),
        country: new FormControl(data.country),
        city: new FormControl(data.city)
      })
      const text: string = 'Editati adresa'
      this.dialog.open<EditAddressFormDialogComponent, EditAddressFormData>(EditAddressFormDialogComponent,
        {
          data: {
            callback: this.editAddress.bind(this),
            text: text,
            args: [],
            form
          }
        });
    })
  }

  addProductVariant(formGroup: FormGroup<AddEditProductVariantForm>) {
    const productVariant = formGroup.value as ProductVariant
    this.productVariantService.addProductVariant(productVariant).subscribe(() => {
      this.snackBar.open("Produs adaugat cu succes!", "Inchideti", {
        duration: 4000,
        panelClass: ['success']
      })
    })
  }

  editProductVariant(formGroup: FormGroup<AddEditProductVariantForm>) {
    const productVariant = formGroup.value as ProductVariant
    this.productVariantService.updateProductVariant(productVariant.id, productVariant).subscribe(() => {
      this.snackBar.open("Formular actualizat cu succes!", "Inchideti", {
        duration: 4000,
        panelClass: ['success']
      })
    })
  }

  updateProductVariant(id: number) {
    this.productVariantService.getProductVariantId(id).subscribe(data => {
      const form = new FormGroup<AddEditProductVariantForm>({
        id: new FormControl(data.id),
        name: new FormControl(data.name),
        description: new FormControl(data.description),
        price: new FormControl(data.price),
        quantity: new FormControl(data.quantity),
        addedDate: new FormControl(data.addedDate),
        categoryVariant: new FormControl(data.categoryVariant),
        productCore: new FormControl(data.productCore),
        attributeVariant: new FormControl(data.attributeVariant),
        photoUrl: new FormControl(data.photoUrl)
      })
      const text: string = 'Editati produsul'
      this.dialog.open<EditProductVariantFormDialogComponent, EditProductVariantFormData>(EditProductVariantFormDialogComponent,
        {
          data: {
            callback: this.editProductVariant.bind(this),
            text: text,
            args: [],
            form
          }
        });
    })
  }

  addEntity(selectedEntity: string) {
    if (selectedEntity === 'Utilizatori') {
      const form = new FormGroup<AddEditUser>({
        id: new FormControl(null),
        firstName: new FormControl(null),
        lastName: new FormControl(null),
        email: new FormControl(null),
        password: new FormControl(null),
        defaultBillingAddress: new FormControl(null),
        defaultDeliveryAddress: new FormControl(null),
        phoneNumber: new FormControl(null),
        role: new FormControl(null),
        addresses: new FormControl(null)
      })
      const text: string = `Adaugati un nou utilizator`;
      this.dialog.open<EditUserFormDialogComponent, EditUserFormData>(EditUserFormDialogComponent,
        {
          data: {
            callback: this.addUser.bind(this),
            text: text,
            args: [],
            form
          }
        });
    }
    if (selectedEntity === 'Adrese') {
      const form = new FormGroup<AddEditAddress>({
        id: new FormControl(null),
        streetLine: new FormControl(null),
        postalCode: new FormControl(null),
        country: new FormControl(null),
        city: new FormControl(null)
      })
      const text: string = 'Adaugati o noua adresa'
      this.dialog.open<EditAddressFormDialogComponent, EditAddressFormData>(EditAddressFormDialogComponent,
        {
          data: {
            callback: this.addAddress.bind(this),
            text: text,
            args: [],
            form
          }
        });
    }
    if (selectedEntity === 'Produse') {
      const form = new FormGroup<AddEditProductVariantForm>({
        id: new FormControl(null),
        name: new FormControl(null),
        description: new FormControl(null),
        price: new FormControl(null),
        quantity: new FormControl(null),
        addedDate: new FormControl(null),
        categoryVariant: new FormControl(null),
        productCore: new FormControl(null),
        attributeVariant: new FormControl(null),
        photoUrl: new FormControl(null)
      })
      const text: string = 'Adaugati un nou produs'
      this.dialog.open<EditProductVariantFormDialogComponent, EditProductVariantFormData>(EditProductVariantFormDialogComponent,
        {
          data: {
            callback: this.addProductVariant.bind(this),
            text: text,
            args: [],
            form
          }
        });
    }
  }
}
