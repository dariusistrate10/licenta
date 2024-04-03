import { Address } from "./Address";

export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    defaultDeliveryAddress: string,
    defaultBillingAddress: string,
    addresses: Address[]
}