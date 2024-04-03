import { Address } from "./Address";
import { Cart } from "./Cart";

export interface Orders {
    id: number,
    paymentType: string,
    deliveryAddress: string,
    invoiceAddress: string,
    totalPrice: number,
    orderDate: Date,
    cart: Cart,
    address: Address
}