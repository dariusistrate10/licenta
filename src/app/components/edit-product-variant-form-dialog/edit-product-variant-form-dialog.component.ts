import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditUserFormData, FormDialogSubmitCallback} from "../edit-user-form-dialog/edit-user-form-dialog.component";
import {FormGroup} from "@angular/forms";
import {AddEditUser} from "../../utils/User";
import {AddEditProductVariantForm} from "../../utils/ProductVariant";

@Component({
  selector: 'app-edit-product-variant-form-dialog',
  templateUrl: './edit-product-variant-form-dialog.component.html',
  styleUrls: ['./edit-product-variant-form-dialog.component.css']
})
export class EditProductVariantFormDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<EditProductVariantFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: EditProductVariantFormData,
    private snackBar: MatSnackBar) {
  }


  submit() {
    if (this.data.form.valid) {
      this.data.callback.apply(null, [this.data.form, ...this.data.args]);
      this.dialogRef.close();
    } else {
      this.data.form.markAllAsTouched();
      this.snackBar.open("Formular invalid", "Inchide",
        {
          duration: 2000,
          panelClass: ['snackbar-error']
        });
    }
  }
}

export interface EditProductVariantFormData {
  callback: FormDialogSubmitCallback;
  text: string;
  args: Parameters<FormDialogSubmitCallback>;
  form: FormGroup<AddEditProductVariantForm>;
}
