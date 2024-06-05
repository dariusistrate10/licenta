import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AddEditUser, User, UserPostDTO} from 'src/app/utils/User';
import { UserService } from 'src/app/services/user.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  loggedUser: User = JSON.parse(localStorage.getItem('user') || 'null');
  public form = new FormGroup<AddEditUser>({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    defaultDeliveryAddress: new FormControl(null),
    defaultBillingAddress: new FormControl(null),
    addresses: new FormControl(null),
    phoneNumber: new FormControl(null, Validators.required)
  })

  constructor(private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if(this.loggedUser == null) {
      this.router.navigate(['/'])
    }
  }

  updateUser() {
    const user = this.form.value as unknown as UserPostDTO
    if(this.form.valid) {
      this.userService.updateUser(this.loggedUser.id!, user).subscribe()
      this.snackBar.open("Actualizare efectuata cu succes! Noile date vor fi disponibile la urmatoarea autentificare", "Inchideti", {
        duration: 5000
      })
      this.router.navigate(['/'])
    } else {
      this.snackBar.open('Formular invalid', 'Inchideti', {
        duration: 3000
      });
    }
  }

}
