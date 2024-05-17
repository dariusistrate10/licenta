import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/utils/User';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddEditAddress} from "../../utils/Address";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  loggedUser: User = JSON.parse(localStorage.getItem('user') || 'null');
  public form = new FormGroup<AddEditAddress>({
    streetLine: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    postalCode: new FormControl(null, Validators.required),
  })

  constructor(private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if(this.loggedUser == null) {
      this.router.navigate(['/'])
    }
  }

  updateAddress() {
    if(this.form.valid) {
      // salveaza adresa
    } else {
      this.snackBar.open('Formular invalid', 'Inchideti', {
        duration: 3000
      });
    }
  }
}
