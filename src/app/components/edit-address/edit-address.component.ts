import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/User';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  loggedUser: User = JSON.parse(localStorage.getItem('user') || 'null');

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.loggedUser == null) {
      this.router.navigate(['/'])
    }
  }

}
