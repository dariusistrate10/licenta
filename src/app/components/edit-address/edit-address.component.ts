import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/utils/User';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddEditAddress, AddressPostDTO} from "../../utils/Address";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddressService} from "../../services/address.service";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  loggedUser: User = JSON.parse(localStorage.getItem('user') || 'null');
  public form = new FormGroup<AddEditAddress>({
    id: new FormControl(null),
    streetLine: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    postalCode: new FormControl(null, Validators.required),
  })

  protected addressId!: number | undefined

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private addressService: AddressService) {
  }

  ngOnInit(): void {
    if (this.loggedUser == null) {
      this.router.navigate(['/'])
    }
  }

  updateAddress() {
    const address = this.form.value as AddressPostDTO
    this.loggedUser.addresses?.map(address => {
      this.addressId = address.id
    })
    if (this.form.valid) {
      this.addressService.updateAddress(this.addressId, address).subscribe()
      this.snackBar.open("Actualizare efectuata cu succes! Noile date vor fi disponibile la urmatoarea autentificare", "Inchideti", {
        duration: 5000
      })
      this.router.navigate(['/'])
    } else {
      this.snackBar.open('Formular invalid', 'Inchideti', {
        duration: 10000
      });
    }
  }
}
