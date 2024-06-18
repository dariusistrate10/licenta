import { AttributeVariant } from "./AttributeVariant";
import { CategoryVariant } from "./CategoryVariant";
import { ProductCore } from "./ProductCore";
import {FormControl} from "@angular/forms";

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

export interface AddEditProductVariantForm {
  id: FormControl<number | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  price: FormControl<number | null>;
  quantity: FormControl<number | null>;
  addedDate: FormControl<Date | null>;
  categoryVariant: FormControl<CategoryVariant | null>;
  productCore: FormControl<ProductCore | null>;
  attributeVariant: FormControl<AttributeVariant | null>;
  photoUrl: FormControl<string | null>;
}
