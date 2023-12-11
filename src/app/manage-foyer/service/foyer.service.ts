import { Injectable } from '@angular/core';
import { Foyer } from '../model/Foyer';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {
  private baseUrl = environment.url+"/foyer";
  private foyerIdSubject = new BehaviorSubject<number>(0);
  foyerId$ = this.foyerIdSubject.asObservable();
  idFoyer$: any;

  constructor(private http: HttpClient) { }

  setFoyerId(foyerId: number): void {
    this.foyerIdSubject.next(foyerId);
  }


  getListFoyer() {
    return this.http.get(`${this.baseUrl}/foyers`);
  }



  addFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.baseUrl}/addfoyer`, foyer);
  }



  deleteFoyer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/foyer/${id}`);
  }


  getFoyerById(idFoyer: number): Observable<Foyer> {
    return this.http.get<Foyer>(`${this.baseUrl}/foyer/${idFoyer}`);
  }


  updateFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.put<Foyer>(`${this.baseUrl}/foyer`, foyer);
  }

  likeFoyer(foyerId: number): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.baseUrl}/like/${foyerId}`, {});
  }

  dislikeFoyer(foyerId: number): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.baseUrl}/dislike/${foyerId}`, {});
  }

  getSommeCapaciteTousLesFoyers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sommeCapaciteTousLesFoyers`);
  }

}
