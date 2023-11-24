import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { UserService } from '../../manage-user/service/user.service';
import { AuthService } from './auth.service';
//pour dire que le service est injectable au niveau racine de l'application
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  token!:any
  constructor(private authService: AuthService, private router: Router) {

  }
//Elle est appelée lorsqu'une tentative de navigation vers une route protégée est effectuée.
canActivate(): Observable<boolean> {
  return this.authService.currentUser$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map((currentUser) => {
      if (!currentUser) {
        this.router.navigateByUrl('/login');
        return false;
      }
      return true;
    })
  );
}
}
