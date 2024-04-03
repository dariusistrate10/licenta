import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/Address';
import { User } from 'src/app/User';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  phone!: string;
  delivery!: string;
  billing!: string;
  streetline!: string;
  postalcode!: string;
  city!: string;
  country!: string;
  foundUser!: any;

  constructor(private userService: UserService, private addressService: AddressService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if(!this.firstname) {
      alert("Please add your first name!");
      return;
    }
    if(!this.lastname) {
      alert("Please add your last name!");
      return;
    }
    if(!this.email) {
      alert("Please add your email!");
      return;
    }
    if(!this.password) {
      alert("Please add your password!");
      return;
    }
    if(!this.phone) {
      alert("Please add your phone number!");
      return;
    }
    if(!this.delivery) {
      alert("Please add your delivery address!");
      return;
    }
    if(!this.billing) {
      alert("Please add your billing address!");
      return;
    }
    if(!this.streetline) {
      alert("Please add your streetline address!");
      return;
    }
    if(!this.postalcode) {
      alert("Please add your postal code!");
      return;
    }
    if(!this.city) {
      alert("Please add your city!");
      return;
    }
    if(!this.country) {
      alert("Please add your country!");
      return;
    }

    const newUser: User = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phoneNumber: this.phone,
      password: this.password,
      defaultDeliveryAddress: this.delivery,
      defaultBillingAddress: this.billing,
      addresses: []
    }

    const newAddress: Address = {
      streetLine: this.streetline,
      postalCode: this.postalcode,
      city: this.city,
      country: this.country
    }

    this.userService.addUser(newUser, newAddress).subscribe((data) => {
      console.log("Am adaugat user")
    });
    console.log(newUser.email)
    setTimeout(() => {
      this.userService.searchUserByEmail(newUser.email).subscribe((data) => {
        this.foundUser = data;
        console.log(this.foundUser)
        this.cartService.addCart(this.foundUser.id).subscribe();
        this.router.navigate(['/login'])
      })
    }, 6000)
  }
}
