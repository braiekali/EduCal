import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-confirm-dialog',
  templateUrl: './reset-password-confirm-dialog.component.html',
  styleUrls: ['./reset-password-confirm-dialog.component.scss']
})
export class ResetPasswordConfirmDialogComponent {
  email: string = '';

  constructor(public dialogRef: MatDialogRef<ResetPasswordDialogComponent>) {}
}

