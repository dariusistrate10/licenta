import {FormControl} from "@angular/forms";

export interface Address {
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
