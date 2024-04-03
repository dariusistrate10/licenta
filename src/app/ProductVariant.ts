import { AttributeVariant } from "./AttributeVariant";
import { CategoryVariant } from "./CategoryVariant";
import { ProductCore } from "./ProductCore";

export interface ProductVariant {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    addedDate: Date,
    categoryVariant: CategoryVariant,
    productCore: ProductCore,
    attributeVariant: AttributeVariant,
    photoUrl: string
}