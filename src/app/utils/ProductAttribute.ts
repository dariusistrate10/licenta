import { AttributeValue } from "./AttributeValue";

export interface ProductAttribute {
    id: number,
    name: string,
    attributeValues: AttributeValue[]
}