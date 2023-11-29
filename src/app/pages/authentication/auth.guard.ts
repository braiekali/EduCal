import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { UserService } from '../../manage-user/service/user.service';
import { AuthService } from './auth.service';
//pour dire que le service est injectable au niveau racine de l'application
@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router) {

  }
//Elle est appelée lorsqu'une tentative de navigation vers une route protégée est effectuée.

}
