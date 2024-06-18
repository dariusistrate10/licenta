import {Address} from "./Address";
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
  role?: string,
  addresses?: Address[]
}

export interface UserPost {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  defaultDeliveryAddress: string;
  defaultBillingAddress: string;
  role: string;
  addressIds: number[];
}

export interface UserPostDTO {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  defaultDeliveryAddress: string,
  defaultBillingAddress: string
  addresses: Address[]
}

export interface UserWithAddressDTO {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  defaultDeliveryAddress: string,
  defaultBillingAddress: string,
  streetLine: string,
  postalCode: string,
  city: string,
  country: string
}

export interface AddEditUser {
  id: FormControl<number | null>,
  firstName: FormControl<string | null>,
  lastName: FormControl<string | null>,
  email: FormControl<string | null>,
  phoneNumber: FormControl<string | null>,
  password: FormControl<string | null>,
  defaultDeliveryAddress: FormControl<string | null>,
  defaultBillingAddress: FormControl<string | null>,
  role: FormControl<string | null>,
  addresses: FormControl<Address[] | null>
}

export interface AddEditUserPostDTO {
  id: FormControl<number | null>,
  firstName: FormControl<string | null>,
  lastName: FormControl<string | null>,
  email: FormControl<string | null>,
  phoneNumber: FormControl<string | null>,
  password: FormControl<string | null>,
  defaultDeliveryAddress: FormControl<string | null>,
  defaultBillingAddress: FormControl<string | null>,
  streetLine: FormControl<string | null>,
  postalCode: FormControl<string | null>,
  city: FormControl<string | null>,
  country: FormControl<string | null>,
}

export interface LoginForm {
  email: FormControl<string | null>,
  password: FormControl<string | null>
}
