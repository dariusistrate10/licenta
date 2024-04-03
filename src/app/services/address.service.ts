import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(`${this.url}/address`);
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.url}/address/add`, address)
  }
}
