import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Chambre} from "./model/chambre";

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  constructor(private http: HttpClient) {
  }

  getChambres() {
    return this.http.get("http://localhost:8082/chambres")
  }

  fetchChambreById(id: any) {
    return this.http.get("http://localhost:8082/chambre/" + id)
  }

  removeChambre(id: any) {
    return this.http.delete("http://localhost:8082/chambre/" + id)
  }

  addChambre(data: any) {
    return this.http.post("http://localhost:8082/addchambree", data);
  }


  updateChambre(data: any) {
    return this.http.put("http://localhost:8082/chambre", data)
  }


  //****************RESERVATION************************
  getReservations() {
    return this.http.get("http://localhost:8082/reservations")
  }

  fetchReservationById(id: any) {
    return this.http.get("http://localhost:8082/reservation/" + id)
  }

  removeReservation(id: any) {
    return this.http.delete("http://localhost:8082/reservation/" + id)
  }

  addReservation(data: any) {
    return this.http.post("http://localhost:8082/addreservation", data)
  }

  updateReservation(data: any) {
    return this.http.put("http://localhost:8082/reservation", data)
  }

  getReservationByIdUser(id:any){
    return this.http.get("http://localhost:8082/reservationUser/" + id)

  }
  //****************Email***********************

  sendEmail(data:any){
    return this.http.post("http://localhost:8082/sendEmailReservation" , data)
  }

//****************IMAGE***********************

  uploadImage(id:any,data:any){
    return this.http.post("http://localhost:8082/uploadImage/" + id,data)

  }
 // @GetMapping("/getImage/{fileName:.+}")
  getImage(fileName:any){
    return this.http.get("http://localhost:8082/getImage/" + fileName, { responseType: 'blob' })

  }

  //************************EXTRA********************
  getBlocs() {
    return this.http.get("http://localhost:8082/blocs")
  }
  getBlocById(id :any){
    return this.http.get("http://localhost:8082/bloc/" + id)
  }

}
