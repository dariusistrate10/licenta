import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../utils/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.url}/cart`);
  }

  findCartByUserId(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}/cart/find/${userId}`);
  }

  addCart(userId: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.url}/cart/add/${userId}`, null);
  }

}
