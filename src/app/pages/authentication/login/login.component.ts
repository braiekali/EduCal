import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';
import { ResetPasswordConfirmDialogComponent } from '../reset-password-confirm-dialog/reset-password-confirm-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../../assets/css/default.css',
    '../../../../assets/css/bootstrap.min.css',
    '../../../../assets/front/css/fontAwesome5Pro.css',
    '../../../../assets/css/style.css',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppSideLoginComponent {
  formSubmitted = false; // Initialisez la variable formSubmitted

  loginForm: FormGroup;
  email: string ;
  password: string;
  formError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http :HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  get form() {
    return this.loginForm.controls;
  }
  // Declare 'f' property
  get f() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    this.formSubmitted = true;
  
    if (this.loginForm.invalid) {
      this.formError = true;
      return;
    }
  
    if (this.loginForm.valid) {
      // Use the form values directly
      const email = this.form['email'].value;
      const password = this.form['password'].value;
  
      // Call your authentication service to perform the login
      this.authService.login(email, password).subscribe(
        (response) => {
          // Handle successful login, e.g., store token, navigate to home page, etc.
          console.log('Login successful', response);
          this.router.navigate(['/home']); // Adjust the route based on your application
        },
        (error) => {
          // Handle login error
          console.error('Login failed', error);
        }
      );
    }
  }

  showResetPasswordDialog(event: Event) {
    event.preventDefault();
  
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const email = result.email;
        this.authService.resetPasswordRequest(email).subscribe(
          () => {
            this.snackBar.open('Password reset request has been sent successfully.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          },
          (error) => {
            this.snackBar.open('Failed to send password reset request.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          }
        );
      }
    });
  }

  showResetPasswordConfirmDialog(token: string) {
    const dialogRef = this.dialog.open(ResetPasswordConfirmDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newPassword = result.newPassword;
        const passwordRequestUtil = { password: newPassword };
  
        this.authService.resetPassword(passwordRequestUtil, token).subscribe(
          () => {
            this.snackBar.open('Password has been reset successfully.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          },
          (error) => {
            this.snackBar.open('Failed to reset password.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          }
        );
      }
    });
  }

  showChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const requestUtil = {
          currentPassword: result.currentPassword,
          newPassword: result.newPassword,
        };
  
        this.authService.changePassword(requestUtil).subscribe(
          () => {
            this.snackBar.open('Password has been changed successfully.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          },
          (error) => {
            this.snackBar.open('Failed to change password.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          }
        );
      }
    });
  }

}
