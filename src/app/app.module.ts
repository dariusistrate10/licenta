import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UsersComponent } from './components/users/users.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RegisterComponent } from './components/register/register.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { AddressesListComponent } from './components/addresses-list/addresses-list.component';
import { ProductfilterPipe } from './pipes/productfilter.pipe';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CartComponent } from './components/cart/cart.component';
import { StickyNavbarComponent } from './components/sticky-navbar/sticky-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SuccessComponent } from './components/success/success.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ScrollRevealComponent } from './components/scroll-reveal/scroll-reveal.component';
import { ProductsVariantComponent } from './components/products-variant/products-variant.component';
import { ProductVariantDetailPageComponent } from './components/product-variant-detail-page/product-variant-detail-page.component';
import { EquipageComponent } from './components/equipage/equipage.component';

const firebaseConfig = {
  apiKey: "AIzaSyBL49jzwaXcjRHZz3vMzDv-jcmf710TWJY",
  authDomain: "ddstore-231ff.firebaseapp.com",
  projectId: "ddstore-231ff",
  storageBucket: "ddstore-231ff.appspot.com",
  messagingSenderId: "386003810989",
  appId: "1:386003810989:web:0246bce26158d392d3e424"
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    UserRegistrationComponent,
    UsersComponent,
    AboutComponent,
    FooterComponent,
    ContactComponent,
    ProductsComponent,
    FilterPipe,
    RegisterComponent,
    AddressesComponent,
    AddressesListComponent,
    ProductfilterPipe,
    ProductDetailPageComponent,
    HomepageComponent,
    CartComponent,
    StickyNavbarComponent,
    LoginComponent,
    SuccessComponent,
    EditProfileComponent,
    EditAddressComponent,
    LoginModalComponent,
    ScrollRevealComponent,
    ProductsVariantComponent,
    ProductVariantDetailPageComponent,
    EquipageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
