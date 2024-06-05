import {ProductVariant} from "./ProductVariant";
import {FormControl} from "@angular/forms";

export interface Review {
  id: number,
  name: string,
  email: string,
  subject: string,
  description: string
  productVariant: ProductVariant
}

export interface ReviewPostDTO {
  name: string,
  email: string,
  subject: string,
  description: string,
}

export interface AddEditReviewForm {
  name: FormControl<string | null>,
  subject: FormControl<string | null>,
  description: FormControl<string | null>
}
