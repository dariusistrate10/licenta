import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/utils/User';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/utils/Cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  foundUser!: any;
  cart!: Cart;
  foundCart!: Cart;
  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private userService: UserService, private router: Router, private location: Location, private cartService: CartService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.email)
    this.userService.searchUserByEmail(this.email).subscribe(user => {
      this.foundUser = user;
      if(this.password === this.user.password) {
        localStorage.setItem('user', JSON.stringify(this.foundUser));
        this.cartService.findCartByUserId(this.foundUser.id).subscribe((data) => {
          console.log(data)
          this.foundCart = data;
          localStorage.setItem('cart', JSON.stringify(this.foundCart))
        });
        this.router.navigate(['/']);
      }
      console.log(this.foundUser);
    });
  }
}
