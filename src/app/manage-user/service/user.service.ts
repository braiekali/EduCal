import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/user';
import { Role } from '../model/role';
import { environment } from 'app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
 
 
 // Register a new user
 addUser(user: User): Observable<User> {
  return this.http.post<User>(environment.url +`/admin/adduser`, user);
}

// Get user by ID
getUserById(idUser: number): Observable<any> {
  return this.http.get(environment.url +`/admin/user/${idUser}`);
}

// Get all users
getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(environment.url +`/admin/users`);
}

// Update user details

updateUser(data:any){
  return this.http.put<User>((environment.url +`/admin/updateuser`),data);
}
// Delete user by ID
deleteUser(userId: number): Observable<any> {
  return this.http.delete(environment.url +`/admin/deleteuser/${userId}`);
}

findByCin(cin: number): Observable<User> {
  const url = environment.url + `/admin/user/cin/${cin}`;
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
  const url = environment.url +`/admin/checkEmailExists?email=${email}`;
  return this.http.get<boolean>(url);
}

checkCinExists(cin: string): Observable<boolean> {
  const url = environment.url +`/admin/checkCinExists?cin=${cin}`;
  return this.http.get<boolean>(url);
}

// Request password reset
requestPasswordReset(email: string): Observable<any> {
  return this.http.post(environment.url +`/password-reset-request`, { email });
}

// Reset password
resetPassword(token: string, newPassword: string): Observable<any> {
  return this.http.post(environment.url +`/reset-password?token=${token}`, { newPassword });
}

// Change user password
changePassword(email: string, newPassword: string): Observable<any> {
  return this.http.post(environment.url +`/change-password`, { email, newPassword });
}



}
  


