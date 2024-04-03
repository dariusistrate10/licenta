import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, reduce, switchMap, tap } from 'rxjs';
import { CartEntry } from '../utils/CartEntry';
import { Product } from '../utils/Product';

@Injectable({
  providedIn: 'root'
})
export class CartentryService {

  private url = "http://localhost:8080/api";
  cartEntries$: BehaviorSubject<CartEntry[]> = new BehaviorSubject<CartEntry[]>([]);
  cartQuantity$!: Observable<number>
  cartTotal$!: Observable<number>
  products$!: Observable<Product[]>
  foundCart: any = JSON.parse(localStorage.getItem('cart') || 'null');

  constructor(private http: HttpClient) {
    if(this.foundCart != null) {
      this.getCartEntry(this.foundCart.id).subscribe()
    }
  }

  getSpecificCartEntry(cartId: number): Observable<CartEntry[]> {
    return this.http.get<CartEntry[]>(`${this.url}/cartentry/${cartId}`);
  }

  getCartEntry(cartId: number): Observable<CartEntry[]> {
    return this.http.get<CartEntry[]>(`${this.url}/cartentry/${cartId}`).pipe(
      tap((cartEntries) => {
        this.cartEntries$.next(cartEntries)
        // console.log(cartEntries);
        // this.cartTotal$ = this.cartEntries$.pipe(
        //   map((cartEntries) => cartEntries.map(cartEntry => cartEntry.products?.price ?? 0).reduce((entry1,entry2) => entry1 + entry2,0))
        // )
        this.cartTotal$ = this.cartEntries$.pipe(
          map((cartEntries) =>
            cartEntries.reduce(
              (total, cartEntry) =>
                total + (cartEntry.productVariants.reduce((sum, product) => sum + product.price, 0) * cartEntry.quantity),
              0
            )
          )
        );
        this.cartQuantity$ = this.cartEntries$.pipe(
          map((cartEntries) => cartEntries.map(cartEntry => cartEntry.quantity ?? 0).reduce((entry1,entry2) => entry1 + entry2,0))
        )
      })
    );
  }

  addCartEntry(cartId: number, productId: number): Observable<CartEntry[]> {
    return this.http.post<CartEntry>(`${this.url}/cartentry/add/${productId}/${cartId}`, null).pipe(
      switchMap(() => this.getCartEntry(cartId))
    );
  }

  addCartEntryVariant(cartId: number, productVariantId: number): Observable<CartEntry[]> {
    return this.http.post<CartEntry>(`${this.url}/cartentry/add/variant/${productVariantId}/${cartId}`, null).pipe(
      switchMap(() => this.getCartEntry(cartId))
    );
  }

  deleteCartEntry(productId: number): Observable<CartEntry[]> {
    return this.http.delete<CartEntry>(this.url+"/cartentry/delete/"+productId).pipe(
      switchMap(() => this.getCartEntry(this.foundCart.id))
    )
  }

  updateCartEntry(cartEntryId: number, newQuantity: number): Observable<CartEntry[]> {
    return this.http.put<CartEntry>(this.url+"/cartentry/update/"+cartEntryId+"/"+newQuantity, null).pipe(
      switchMap(() => this.getCartEntry(this.foundCart.id))
    )
  }

  deleteAllCartEntries(cartId: number): Observable<CartEntry[]> {
    return this.http.delete<CartEntry[]>(this.url+"/cartentry/delete/all/"+cartId).pipe(
      switchMap(() => this.getCartEntry(this.foundCart.id))
    )
  }
}
