import { VariantAttributeValue } from "./VariantAttributeValue";

export interface ProductVariantAttribute {
    id?: number,
    name: string,
    value: string,
    variantAttributeValue: VariantAttributeValue
}