import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductVariantAttributeValue } from '../ProductVariantAttributeValue';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantAttributeValueService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getProductVariantAttributeValues(): Observable<ProductVariantAttributeValue> {
    return this.http.get<ProductVariantAttributeValue>(`${this.url}/product/variant/attribute/value`)
  }
}
