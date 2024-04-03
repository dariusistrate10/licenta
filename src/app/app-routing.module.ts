import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { UsersComponent } from './components/users/users.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { CartComponent } from './components/cart/cart.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SuccessComponent } from './components/success/success.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { ProductsVariantComponent } from './components/products-variant/products-variant.component';
import { ProductVariantDetailPageComponent } from './components/product-variant-detail-page/product-variant-detail-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/variants', component: ProductsVariantComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductDetailPageComponent },
  { path: 'products/variant/:id', component: ProductVariantDetailPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'edit/profile', component: EditProfileComponent },
  { path: 'edit/address', component: EditAddressComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
