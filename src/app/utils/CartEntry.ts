import { Cart } from "./Cart";
import { Product } from "./Product";
import { ProductVariant } from "./ProductVariant";

export interface CartEntry {
    id: number,
    quantity: number,
    cart?: Cart,
    products: Product[],
    productVariants: ProductVariant[],
    productId: number,
    cartId: number
}