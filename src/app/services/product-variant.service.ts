import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductVariant } from '../utils/ProductVariant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {

  private url = "http://localhost:8080/api";
  productVariants$: BehaviorSubject<ProductVariant[]> = new BehaviorSubject<ProductVariant[]>([]);

  constructor(private http: HttpClient) {
    this.getProductVariants().subscribe();
  }

  getProductVariants(): Observable<ProductVariant[]> {
    return this.http.get<ProductVariant[]>(`${this.url}/product/variant`).pipe(
      tap((productVariants) => {
        this.productVariants$.next(productVariants)
      })
    )
  }

  getProductVariantId(productVariantId: number): Observable<ProductVariant> {
    return this.http.get<ProductVariant>(`${this.url}/product/variant/find/${productVariantId}`);
  }

  getProductVariantsByPrice(minPrice: number, maxPrice: number): Observable<ProductVariant[]> {
    return this.http.get<ProductVariant[]>(`${this.url}/product/variant/filter/${minPrice}/${maxPrice}`)
  }

  getProductVariantsByCategory(categoryId: number): Observable<ProductVariant[]> {
    return this.http.get<ProductVariant[]>(`${this.url}/product/variant/filter/${categoryId}`)
  }
}
