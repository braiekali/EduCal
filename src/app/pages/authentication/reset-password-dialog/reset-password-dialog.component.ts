import { Component } from '@angular/core';
import { ResetPasswordConfirmDialogComponent } from '../reset-password-confirm-dialog/reset-password-confirm-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent {
  newPassword: string = '';
  
  constructor(public dialogRef: MatDialogRef<ResetPasswordConfirmDialogComponent>) {}
}
