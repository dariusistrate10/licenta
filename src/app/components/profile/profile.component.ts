import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Orders} from "../../utils/Orders";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loggedUser: any
  public foundCart: any
  public ordersNumber!: number
  public orders!: Orders[]

  constructor(private orderService: OrderService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user') || 'null');
    this.foundCart = JSON.parse(localStorage.getItem('cart') || 'null');

    if (this.loggedUser.cart.orders.length) {
      this.ordersNumber = this.loggedUser.cart.orders.length
    }

    this.orderService.getOrdersByUserId(this.loggedUser.id).subscribe(data => {
      if (data) {
        this.orders = data
      }
    })
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy')?.replaceAll('-', '.')
  }

  hidePassword(password: string) {
    return this.loggedUser.password.replace(/./g, '*')
  }
}
