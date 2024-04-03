import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../utils/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.url}/payment`)
  }

  addPayment(payment: Payment, userId: number): Observable<Payment> {
    return this.http.post<Payment>(`${this.url}/payment/add/${userId}`, payment);
  }
}
