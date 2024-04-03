import { ProductVariantAttribute } from "./ProductVariantAttribute";

export interface AttributeVariant {
    id?: number,
    name: string,
    productVariantAttributes: ProductVariantAttribute[]
}