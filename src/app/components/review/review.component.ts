import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddEditReviewForm, ReviewPostDTO} from "../../utils/Review";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductVariantService} from "../../services/product-variant.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  protected form = new FormGroup<AddEditReviewForm>({
    name: new FormControl(null, Validators.required),
    subject: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })

  protected productId!: number

  constructor(private snackBar: MatSnackBar,
              private productVariantService: ProductVariantService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id']
    })
  }

  submit() {
    const review = this.form.value as ReviewPostDTO
    if(this.form.valid) {
      this.productVariantService.addReview(this.productId, review).subscribe(data => {
        this.router.navigate(['/products/variant', this.productId])
      })
    } else {
      this.snackBar.open("Formular invalid", "Inchide", {
        duration: 3000
      })
    }
  }
}
