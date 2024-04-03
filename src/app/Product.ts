import { Category } from "./Category";
import { ProductAttribute } from "./ProductAttribute";
import { ProductValue } from "./ProductValue";

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    addedDate: Date,
    categories: Category[],
    productAttributes: ProductAttribute[],
    productValues: ProductValue[],
    photoUrl: string
}