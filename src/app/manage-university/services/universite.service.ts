import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Universite} from "../models/Universite";
import {Foyer} from "../models/Foyer";

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  constructor(private http:HttpClient) { }
  getUniversites(){
    return  this.http.get("http://localhost:8082/universites");
  }
  addUniversite(data:any):Observable<Universite>{
    return this.http.post<Universite>("http://localhost:8082/adduniversite",data);
  }
  deleteUniversite(id: number): Observable<Universite> {
    const url = `http://localhost:8082/universite/${id}`;
    return this.http.delete<Universite>(url);
  }
  getUniversiteById(id: number){
    const url = `http://localhost:8082/universite/${id}`;

    return  this.http.get<Universite>(url);
  }
updateUniversite(data:any){
  return this.http.put<Universite>("http://localhost:8082/universite",data);
}

  addUniversiteWithFoyer(data: any, id?: string | null | undefined):Observable<Universite>{
    const url = `http://localhost:8082/adduniversitebyfoyer/${id}`;
    return this.http.post<Universite>(url,data);
  }
  getFoyers(){
    return  this.http.get<Foyer>("http://localhost:8082/foyers");
  }
  getUniversiteByFoyer(idUniversite: number){
    const url = `http://localhost:8082/universitebyfoyer/${idUniversite}`;
    return this.http.delete<Universite>(url);

  }


}
