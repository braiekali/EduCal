import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Bloc } from '../model/Bloc';

@Injectable({
  providedIn: 'root'
})
export class BlocService {
  Chambre: any;
  private baseUrl = 'http://localhost:8082';
  constructor(private http: HttpClient) {

  }
  private blocIdSubject = new BehaviorSubject<number>(0);
  blocId$ = this.blocIdSubject.asObservable();

  setBlocId(blocId: number): void {
    this.blocIdSubject.next(blocId);
  }

  private blocDetailsSubject = new BehaviorSubject<any>(null);
  blocDetails$: Observable<any> = this.blocDetailsSubject.asObservable();

  setBlocDetails(blocDetails: any): void {
    this.blocDetailsSubject.next(blocDetails);
  }

  getListBloc() {
    return this.http.get(`${this.baseUrl}/blocs`);
  }

  getBlocsByFoyerId(idFoyer: number): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.baseUrl}/blocsByfoyer/${idFoyer}`);
  }

  deleteBloc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/bloc/${id}`);
  }


  updateBlocForFoyer(idFoyer: number, idBloc: number, updatedBloc: Bloc): Observable<any> {
    return this.http.put(`${this.baseUrl}/${idFoyer}/${idBloc}`, updatedBloc);
  }


  getBlocByIdFoyerAndIdBloc(idFoyer: number, idBloc: number): Observable<Bloc> {
    return this.http.get<Bloc>(`${this.baseUrl}/${idFoyer}/${idBloc}`);
  }


  getChambresByFoyerAndBloc(idFoyer: number, idBloc: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/foyer/${idFoyer}/${idBloc}`);
  }

  ajouterBlocAuFoyer(idFoyer: number, bloc: Bloc): Observable<void> {
    const url = `${this.baseUrl}/${idFoyer}/ajouterBloc`;
    return this.http.post<void>(url, bloc);
  }

}
