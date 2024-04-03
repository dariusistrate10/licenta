import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartEntry } from 'src/app/CartEntry';
import { CartentryService } from 'src/app/services/cartentry.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() cartNumber: number = 0;
  faHamburger = faBars;
  faCart = faCartShopping;
  cartQuantity$!: Observable<number>
  loggedUser = JSON.parse(localStorage.getItem('user') || 'null')
  // loggedUser = JSON.parse(sessionStorage.getItem('user') || 'null')

  constructor(private cartEntryService: CartentryService, private router: Router) {}

  ngOnInit(): void {
    // this.cartEntryService.getCartEntry().subscribe((cartEntries) => {
    //   this.cartEnties$.next(cartEntries)
    // })
    // this.cartQuantity$ = this.cartEnties$.pipe(
    //   map((cartEntries) => cartEntries.map(cartEntry => cartEntry.quantity ?? 0).reduce((entry1,entry2) => entry1 + entry2,0))
    // )
    this.cartQuantity$ = this.cartEntryService.cartEntries$.pipe(
      map((cartEntries) => cartEntries.length)
    );
  }

  logout() {
    this.router.navigate(['/'])
    localStorage.removeItem('user');
    // sessionStorage.removeItem('user');
    localStorage.removeItem('cart');
    window.location.reload()
  }

}
