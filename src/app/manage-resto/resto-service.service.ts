import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Restaurant} from "./Model/Restaurant";
import {forkJoin, Observable} from "rxjs";
import {Plat} from "./Model/Plat";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class RestoServiceService {


  constructor(private http: HttpClient) {


  }

  fetchRestaurant() {
    return this.http.get<Restaurant[]>(environment.url + "/restaurant/EduCal/Restaurants");
  }

  fetchPlat() {
    return this.http.get<Plat[]>(environment.url + "/plat/Plats");
  }


  addRestaurant(data: any) {
    console.log('Data to be sent:', data);
    return this.http.post(environment.url + "/restaurant/admin/Restaurantadd", data);

  }

  getRestaurantById(id: number): Observable<any> {
    const url = environment.url + `/restaurant/EduCal/Restaurant/${id}`;
    return this.http.get(url);
  }

  getPlatById(id: number): Observable<any> {
    const url = environment.url + `/plat/Plat/${id}`;
    return this.http.get(url);
  }
  deleteRestaurant(id: number): Observable<Restaurant> {
    const url = environment.url + `/restaurant/admin/Restaurant/${id}`;
    return this.http.delete<Restaurant>(url);
  }


  findByRestaurant_IdRestaurant(restaurantId: number): Observable<Plat[]> {
    const url = environment.url + `/plat/PlatsByRestaurant/${restaurantId}`;
    return this.http.get<Plat[]>(url);
  }

  addPlat(data: any) {
    return this.http.post(environment.url + "/plat/Platadd", data);
  }

  updatePlat(idPlat: number, updatedPlat: Plat): Observable<Plat> {
    const url = environment.url + `/plat/Plat/${idPlat}/update`;
    return this.http.put<Plat>(url, updatedPlat);
  }

  deletePlat(id: number): Observable<Plat> {
    const url = environment.url + `/plat/Plat/${id}`;
    return this.http.delete<Plat>(url);
  }


  uploadImage(file: any, idRestaurant: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileImage', file);
    const uploadUrl = environment.url + `/restaurant/uploadImage/${idRestaurant}`;

    // Assuming the backend expects a POST request to the uploadImage endpoint
    return this.http.post(uploadUrl, formData);
  }

  uploadImagePlat(file: any, idPlat: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileImage', file);
    const uploadUrl = environment.url + `/plat/uploadImagePlat/${idPlat}`;

    // Assuming the backend expects a POST request to the uploadImage endpoint
    return this.http.post(uploadUrl, formData);
  }



  //TESTS

  updateRestaurant2(data: any): Observable<any> {
    return this.http.put<Restaurant>('http://localhost:8082/restaurant/admin/Restaurantupdate', data);
  }



  getTotalDishes(): Observable<number> {
    return this.http.get<number>('http://localhost:8082/plat/api/statistics/total-dishes');
  }

  getAverageDishPrice(): Observable<number> {
    return this.http.get<number>('http://localhost:8082/plat/api/statistics/average-dish-price');
  }

  getTotalRestaurants(): Observable<number> {
    return this.http.get<number>('http://localhost:8082/plat/api/statistics/total-restaurants');
  }
  getSalesOverviewData(): Observable<any> {
    const totalDishes$ = this.getTotalDishes();
    const averageDishPrice$ = this.getAverageDishPrice();
    const totalRestaurants$ = this.getTotalRestaurants();

    // Combine multiple observables into one observable
    return forkJoin({
      totalDishes: totalDishes$,
      averageDishPrice: averageDishPrice$,
      totalRestaurants: totalRestaurants$
    });
  }
}
