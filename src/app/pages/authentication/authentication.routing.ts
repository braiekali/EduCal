import { Routes } from '@angular/router';
import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'login',
    component: AppSideLoginComponent,
  },
  {
    path: 'signup',
    component: AppSideRegisterComponent,
  },
  { path: 'register/reset-password', component: ChangePasswordDialogComponent },


];
