import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import {RestoServiceService} from "./resto-service.service";
import {Restaurant} from "./Model/Restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantListResolverService implements Resolve<any> {
  constructor(private rs: RestoServiceService) {}

  resolve(): Observable<Restaurant> | Promise<Restaurant> | any {
    return this.rs.fetchRestaurant();
  }
}
