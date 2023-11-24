import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: [
    '../../../../assets/css/default.css',
    '../../../../assets/css/bootstrap.min.css',
    '../../../../assets/front/css/fontAwesome5Pro.css',
    '../../../../assets/css/style.css',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ResetPasswordDialogComponent {
  email: string = '';
  resetForm: FormGroup;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject your password service
    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>
  ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get form() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.resetForm.invalid) {
      return;
    }

    const email = this.resetForm.value.email;

    // Call your password service to initiate the reset process
    this.authService.resetPasswordRequest(email).subscribe(
      (response) => {
        console.log('Password reset request successful:', response);
        // Handle success, maybe show a confirmation message to the user
        // You may want to close the dialog or navigate the user to another page
        this.dialogRef.close();
      },
      (error) => {
        console.error('Password reset request failed:', error);
        // Handle error, show an error message to the user
      }
    );
    this.dialogRef.close();
    Swal.fire({
      title: " YOOO!",
      text: "Merci de verifier votre email et click on the lin to reset your password!",
      icon: "info"
    })
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
