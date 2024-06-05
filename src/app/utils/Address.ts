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

export interface AddEditAddress {
  streetLine: FormControl<string | null>,
  postalCode: FormControl<string | null>,
  city: FormControl<string | null>,
  country: FormControl<string | null>,
}
