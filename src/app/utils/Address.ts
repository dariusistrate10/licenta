import {FormControl} from "@angular/forms";

export interface Address {
  id?: number,
  streetLine: string,
  postalCode: string,
  city: string,
  country: string
}

export interface AddressPostDTO {
  streetLine: string,
  postalCode: string,
  city: string,
  country: string
}

export interface AddressEditDTO {
  id: number,
  streetLine: string,
  postalCode: string,
  city: string,
  country: string
}

export interface AddEditAddress {
  id: FormControl<number | null>,
  streetLine: FormControl<string | null>,
  postalCode: FormControl<string | null>,
  city: FormControl<string | null>,
  country: FormControl<string | null>,
}

export interface AddEditAddressPostDTO {
  streetLine: FormControl<string | null>,
  postalCode: FormControl<string | null>,
  city: FormControl<string | null>,
  country: FormControl<string | null>,
}
