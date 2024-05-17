import { Orders } from "./Orders";
import {FormControl} from "@angular/forms";

export interface Payment {
    id?: number,
    cardNumber: string,
    cardHolderName: string,
    expiryMonth: string,
    expiryYear: string,
    cvv: string,
    orders?: Orders
}

export interface AddEditPayment {
  cardNumber: FormControl<string | null>,
  cardHolderName: FormControl<string | null>,
  expiryMonth: FormControl<string | null>,
  expiryYear: FormControl<string | null>,
  cvv: FormControl<string | null>,
}
