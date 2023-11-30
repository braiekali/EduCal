import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Restaurant} from "./Model/Restaurant";
import {Observable} from "rxjs";
import {Plat} from "./Model/Plat";

@Injectable({
  providedIn: 'root'
})
export class RestoServiceService {


  constructor(private http: HttpClient) {


  }

  fetchRestaurant() {
    return this.http.get<Restaurant[]>("http://localhost:8082/EduCal/Restaurants");
  }

  fetchPlat() {
    return this.http.get<Plat[]>("http://localhost:8082/Plats");
  }


  addRestaurant(data: any) {
    console.log('Data to be sent:', data);
    return this.http.post("http://localhost:8082/admin/Restaurantadd", data);

  }

  getRestaurantById(id: number): Observable<any> {
    const url = `http://localhost:8082/EduCal/Restaurant/${id}`;
    return this.http.get(url);
  }

  getPlatById(id: number): Observable<any> {
    const url = `http://localhost:8082/Plat/${id}`;
    return this.http.get(url);
  }
  deleteRestaurant(id: number): Observable<Restaurant> {
    const url = `http://localhost:8082/admin/Restaurant/${id}`;
    return this.http.delete<Restaurant>(url);
  }


  /*updateRestaurant(restaurant: any): Observable<any> {
    // Assuming that restaurant.id is the identifier for the restaurant
    const url = `http://localhost:8082/EduCal/admin/Restaurantupdate/${restaurant.id}`;
    return this.http.put(url, restaurant);
  }*/
  updateRestaurant(restaurant: any, imageFile: File): Observable<any> {
    const formData = new FormData();

    // Ajoutez chaque champ du modèle utilisateur individuellement
    formData.append('idRestaurant', restaurant.idRestaurant);
    formData.append('nomRestaurant', restaurant.nomRestaurant);
    formData.append('dateOuverture', restaurant.dateOuverture);
    formData.append('dateFermeture', restaurant.dateFermeture);


    // Assurez-vous que l'image est définie avant de l'ajouter au FormData
    if (imageFile) {
      formData.append('file', imageFile);
    }

    // Utilisez l'opérateur de concaténation de chaînes pour construire l'URL
    const url = `http://localhost:8082/admin/Restaurantupdate`;

    return this.http.put<any>(url, formData);
  }
  updateRestaurantImage(file: any, restaurantId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileImage', file);

    const updateImageUrl = `http://localhost:8082/updateImage/${restaurantId}`;

    // Assuming the backend expects a POST request to the updateImage endpoint
    return this.http.post(updateImageUrl, formData);
  }
  findByRestaurant_IdRestaurant(restaurantId: number): Observable<Plat[]> {
    const url = `http://localhost:8082/PlatsByRestaurant/${restaurantId}`;
    return this.http.get<Plat[]>(url);
  }

  addPlat(data: any) {
    return this.http.post("http://localhost:8082/Platadd", data);
  }

  updatePlat(idPlat: number, updatedPlat: Plat): Observable<Plat> {
    const url = `http://localhost:8082/Plat/${idPlat}/update`;
    return this.http.put<Plat>(url, updatedPlat);
  }

  deletePlat(id: number): Observable<Plat> {
    const url = `http://localhost:8082/Plat/${id}`;
    return this.http.delete<Plat>(url);
  }


  uploadImage(file: any, idRestaurant: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileImage', file);
    const uploadUrl = `http://localhost:8082/uploadImage/${idRestaurant}`;

    // Assuming the backend expects a POST request to the uploadImage endpoint
    return this.http.post(uploadUrl, formData);
  }




  //TESTS

  updateRestaurant2(data: any): Observable<any> {
    return this.http.put<Restaurant>('http://localhost:8082/admin/Restaurantupdate', data);
  }

}
