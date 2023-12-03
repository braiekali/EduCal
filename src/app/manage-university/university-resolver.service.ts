import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UniversiteService } from '../manage-university/services/universite.service';

@Injectable({
  providedIn: 'root',
})
export class UniversityResolver implements Resolve<any> {
  constructor(private universityService: UniversiteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.universityService.getUniversites();
  }
}
