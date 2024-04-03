import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../Orders';
import { Payment } from '../Payment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  addOrder(payment: Payment, userId: number, cartId: number): Observable<Orders> {
    return this.http.post<Orders>(`${this.url}/orders/add/${userId}/${cartId}`, payment);
  }
}
