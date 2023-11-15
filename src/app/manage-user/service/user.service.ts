import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
getUserById(userId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/admin/users/${userId}`);
}

// Get all users
getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/admin/users`);
}

// Update user details
updateUser(userDetails: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/admin/updateuser`, userDetails);
}

// Delete user by ID
deleteUser(userId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/admin/deleteuser/${userId}`);
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
  


