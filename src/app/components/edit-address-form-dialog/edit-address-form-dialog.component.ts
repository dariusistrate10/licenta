import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditUserFormData, FormDialogSubmitCallback} from "../edit-user-form-dialog/edit-user-form-dialog.component";
import {FormGroup} from "@angular/forms";
import {AddEditAddress} from "../../utils/Address";

@Component({
  selector: 'app-edit-address-form-dialog',
  templateUrl: './edit-address-form-dialog.component.html',
  styleUrls: ['./edit-address-form-dialog.component.css']
})
export class EditAddressFormDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditAddressFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: EditAddressFormData,
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

export interface EditAddressFormData {
  callback: FormDialogSubmitCallback;
  text: string;
  args: Parameters<FormDialogSubmitCallback>;
  form: FormGroup<AddEditAddress>;
}
