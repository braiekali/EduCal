import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Chambre} from "./model/chambre";
import { environment } from 'app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  constructor(private http: HttpClient) {
  }

  getChambres() {
    return this.http.get(environment.url +"/chambre/chambres")
  }

  fetchChambreById(id: any) {
    return this.http.get(environment.url +"/chambre/chambre/" + id)
  }

  removeChambre(id: any) {
    return this.http.delete(environment.url +"/chambre/chambre/" + id)
  }

  addChambre(data: any) {
    return this.http.post(environment.url +"/chambre/addchambree", data);
  }


  updateChambre(data: any) {
    return this.http.put(environment.url +"/chambre/chambre", data)
  }


  //****************RESERVATION************************
  getReservations() {
    return this.http.get(environment.url +"/reservation/reservations")
  }

  fetchReservationById(id: any) {
    return this.http.get(environment.url +"/reservation/reservation/" + id)
  }

  removeReservation(id: any) {
    return this.http.delete(environment.url +"/reservation/reservation/" + id)
  }

  addReservation(data: any) {
    return this.http.post(environment.url +"/reservation/addreservation", data)
  }

  updateReservation(data: any) {
    return this.http.put(environment.url +"/reservation/reservation", data)
  }

  getReservationByIdUser(id:any){
    return this.http.get(environment.url +"/reservation/reservationUser/" + id)

  }
  //****************Email***********************

  sendEmail(data:any){
    return this.http.post(environment.url +"/reservation/sendEmailReservation" , data)
  }

//****************IMAGE***********************

  uploadImage(id:any,data:any){
    return this.http.post(environment.url +"/chambre/uploadImage/" + id,data)

  }
 // @GetMapping("/getImage/{fileName:.+}")
  getImage(fileName:any){
    return this.http.get(environment.url +"/chambre/getImage/" + fileName, { responseType: 'blob' })

  }

  //************************EXTRA********************
  getBlocs() {
    return this.http.get(environment.url +`/bloc/blocs`)
  }
  getBlocById(id :any){
    return this.http.get(environment.url +`/bloc/bloc/${id}`)
  }

}
