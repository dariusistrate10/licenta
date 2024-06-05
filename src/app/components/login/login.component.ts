import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {User} from 'src/app/utils/User';
import {UserService} from 'src/app/services/user.service';
import {CartService} from 'src/app/services/cart.service';
import {Cart} from 'src/app/utils/Cart';
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private cartService: CartService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.searchUserByEmail(this.email).subscribe(user => {
      if (user) {
        this.foundUser = user;
        if (this.password === this.foundUser.password) {
          localStorage.setItem('user', JSON.stringify(this.foundUser));
          this.cartService.findCartByUserId(this.foundUser.id).subscribe((data) => {
            this.foundCart = data;
            localStorage.setItem('cart', JSON.stringify(this.foundCart));
            this.router.navigate(['/']);
          }, error => {
            alert('Error fetching cart');
          });
        } else {
          alert('Password does not match');
        }
      } else {
        alert('User not found');
      }
    }, error => {
      alert('Error fetching user');
    });
  }


}
