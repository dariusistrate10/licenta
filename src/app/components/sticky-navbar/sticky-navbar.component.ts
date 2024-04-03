import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sticky-navbar',
  templateUrl: './sticky-navbar.component.html',
  styleUrls: ['./sticky-navbar.component.css']
})
export class StickyNavbarComponent implements OnInit {

  faDelivery = faTruckFast;
  faPayment = faCreditCard;
  faCart = faCartShopping;

  constructor() {}

  ngOnInit(): void {
  }
}
