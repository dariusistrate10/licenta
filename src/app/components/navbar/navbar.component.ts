import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartEntry } from 'src/app/utils/CartEntry';
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
  public role!: string | null

  constructor(private cartEntryService: CartentryService, private router: Router) {}

  ngOnInit(): void {
    this.role = this.loggedUser.role
    this.cartQuantity$ = this.cartEntryService.cartEntries$.pipe(
      map((cartEntries) => cartEntries.length)
    );
  }

  logout() {
    this.router.navigate(['/'])
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    window.location.reload()
  }

}
