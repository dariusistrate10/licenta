import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../utils/Orders';
import { Payment } from '../utils/Payment';
import {Address} from "../utils/Address";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.url}/orders`);
  }

  addOrder(payment: Payment, userId: number, cartId: number): Observable<Orders> {
    return this.http.post<Orders>(`${this.url}/orders/add/${userId}/${cartId}`, payment);
  }

  deleteOrder(id: number) {
    return this.http.delete<Orders>(`${this.url}/orders/delete/${id}`)
  }
}
