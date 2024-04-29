import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private url = `http://127.0.0.1:5000`

  constructor(private http: HttpClient) { }

  getDeals():Observable<any> {
    return this.http.get(`${this.url}/scrape`)
  }
}
