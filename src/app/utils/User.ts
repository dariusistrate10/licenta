import { Address } from "./Address";
import {FormControl} from "@angular/forms";

export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    defaultDeliveryAddress: string,
    defaultBillingAddress: string,
    addresses?: Address[]
}

export interface UserPostDTO {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  defaultDeliveryAddress: string,
  defaultBillingAddress: string,
}

export interface AddEditUser {
  firstName: FormControl<string | null>,
  lastName: FormControl<string | null>,
  email: FormControl<string | null>,
  phoneNumber: FormControl<number | null>,
  password: FormControl<string | null>,
  defaultDeliveryAddress: FormControl<string | null>,
  defaultBillingAddress: FormControl<string | null>,
  addresses: FormControl<Address[] | null>
}

export interface LoginForm {
  email: FormControl<string | null>,
  password: FormControl<string | null>
}
