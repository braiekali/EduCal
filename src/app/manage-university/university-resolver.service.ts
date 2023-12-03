import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UniversiteService } from '../manage-university/services/universite.service';
import {MatTableDataSource} from "@angular/material/table";
import {Universite} from "./models/Universite";

@Injectable({
  providedIn: 'root',
})
export class UniversityResolver implements Resolve<any> {
  constructor(private universityService: UniversiteService) {}


  resolve(): Observable<Universite> | Promise<Universite> | any {
    return this.universityService.getUniversites();
  }

}
