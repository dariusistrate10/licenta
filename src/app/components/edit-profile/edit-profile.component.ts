import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  loggedUser: User = JSON.parse(localStorage.getItem('user') || 'null');
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  password: string = ''
  phone: string = ''
  billingAddress: string = ''
  deliveryAddress: string = ''

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if(this.loggedUser == null) {
      this.router.navigate(['/'])
    }
  }

  updateUser() {
    const updatedUser: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      billingAddress: this.billingAddress,
      deliveryAddress: this.deliveryAddress
    }

    console.log(updatedUser)

    this.userService.updateUser(updatedUser).subscribe((data) => {
      console.log(data)
    });
  }

}
