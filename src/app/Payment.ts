import { Orders } from "./Orders";

export interface Payment {
    id?: number,
    cardNumber: string,
    cardHolderName: string,
    expiryMonth: string,
    expiryYear: string,
    cvv: string,
    orders?: Orders
}