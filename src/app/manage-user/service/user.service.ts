import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost:8082";

 

  constructor(private http: HttpClient) {
  }

 // Register a new user
 addUser(user: User): Observable<User> {
  return this.http.post<User>(`${this.baseUrl}/admin/adduser`, user);
}

// Get user by ID
getUserById(idUser: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/admin/user/${idUser}`);
}

// Get all users
getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/admin/users`);
}

// Update user details

updateUser(data:any){
  return this.http.put<User>((`${this.baseUrl}/admin/updateuser`),data);
}
// Delete user by ID
deleteUser(userId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/admin/deleteuser/${userId}`);
}

findByCin(cin: number): Observable<User> {
  const url = `${this.baseUrl}/admin/user/cin/${cin}`;
  return this.http.get<User>(url)
    .pipe(
      catchError((error: any) => {
        console.error('Erreur de recherche par CIN :', error);
        // Traitez l'erreur ici (affichage d'un message d'erreur, etc.)
        return throwError(error);
      })
    );
}
checkEmailExists(email: string): Observable<boolean> {
  const url = `${this.baseUrl}/admin/checkEmailExists?email=${email}`;
  return this.http.get<boolean>(url);
}

checkCinExists(cin: string): Observable<boolean> {
  const url = `${this.baseUrl}/admin/checkCinExists?cin=${cin}`;
  return this.http.get<boolean>(url);
}

// Request password reset
requestPasswordReset(email: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/password-reset-request`, { email });
}

// Reset password
resetPassword(token: string, newPassword: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/reset-password?token=${token}`, { newPassword });
}

// Change user password
changePassword(email: string, newPassword: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/change-password`, { email, newPassword });
}
}
  


