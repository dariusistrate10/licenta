import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductVariant } from '../utils/ProductVariant';
import { HttpClient } from '@angular/common/http';
import {Review, ReviewPostDTO} from "../utils/Review";

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

  addProductVariant(productVariant: ProductVariant) {
    return this.http.post<ProductVariant>(`${this.url}/product/variant/add`, productVariant)
  }

  updateProductVariant(productVariantId: number, productVariant: ProductVariant) {
    return this.http.put<ProductVariant>(`${this.url}/product/variant/update/${productVariantId}`, productVariant)
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

  deleteProductVariant(id: number) {
    return this.http.delete<ProductVariant>(`${this.url}/product/variant/delete/${id}`)
  }

  getReviewsByProductVariantId(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.url}/product/variant/${productId}/reviews`)
  }

  addReview(productId: number, review: ReviewPostDTO) {
    return this.http.post<ReviewPostDTO>(`${this.url}/product/variant/${productId}/add/review`, review)
  }
}
