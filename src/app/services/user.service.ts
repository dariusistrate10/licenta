import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../utils/User';
import { Address } from '../utils/Address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/users`)
  }

  searchUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${this.url}/users/search?email=${email}`);
  }

  addUser(user: User, address: Address): Observable<User> {
    const userWithAddress = {
      ...user,
      addresses: [address]
    }
    return this.http.post<User>(`${this.url}/users/add`, userWithAddress);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/users/update/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.url}/users/delete/${id}`)
  }
}
