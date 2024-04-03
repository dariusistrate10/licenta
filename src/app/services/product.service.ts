import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../utils/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080/api";
  products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.getProducts().subscribe();
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/product`).pipe(
      tap((products) => {
        this.products$.next(products)
      })
    );
  }

  getProductId(id: number): Observable<Product>{
    return this.http.get<Product>(this.url+"/product/find/"+id);
  }

  getProductsByPrice(minPrice: number, maxPrice: number): Observable<Product>{
    return this.http.get<Product>(`${this.url}/product/filtru/${minPrice}/${maxPrice}`)
  }
}
