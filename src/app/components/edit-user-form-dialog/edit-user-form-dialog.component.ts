import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormGroup} from "@angular/forms";
import {AddEditUser, AddEditUserPostDTO} from "../../utils/User";

export type FormDialogSubmitCallback = (...args: any) => void;

@Component({
  selector: 'app-edit-user-form-dialog',
  templateUrl: './edit-user-form-dialog.component.html',
  styleUrls: ['./edit-user-form-dialog.component.css']
})
export class EditUserFormDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<EditUserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: EditUserFormData,
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

export interface EditUserFormData {
  callback: FormDialogSubmitCallback;
  text: string;
  args: Parameters<FormDialogSubmitCallback>;
  form: FormGroup<AddEditUser>;
}
