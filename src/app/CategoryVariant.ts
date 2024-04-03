import { Subcategory } from "./Subcategory";

export interface CategoryVariant {
    id?: number,
    name: string,
    description: string,
    subcategories: Subcategory[]
}