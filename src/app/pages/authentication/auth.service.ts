import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BaseUrl = 'http://localhost:8082';
  private tokenStorageKey = 'authToken';

  private userSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem(this.tokenStorageKey);
    if (storedToken) {
      this.userSubject.next(storedToken);
    }
  }
  register(firstName: string, lastName: string, cin: number , phone: number ,email: string, password: string, role?: string): Observable<any> {
    const body = { firstName, lastName,cin ,phone, email, password, ...(role && { role }) };

    return this.http.post<any>(`${this.BaseUrl}/register`, body)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        catchError(error => throwError(error))
      );
  }

   



//////////////////
login(email: string, password: string): Observable<any> {
  const body = { email, password };

  return this.http.post<string>(`${this.BaseUrl}/authenticate`, body, { responseType: 'text' as 'json' })
    .pipe(
      tap(token => this.handleAuthentication(token)),
      catchError(error => throwError(error))
    );
}
private handleAuthentication(token: string): void {
  if (token) {
    // Save the token in session storage
    sessionStorage.setItem('authToken', token);

    // Other handling logic if needed
  } else {
    // Handle authentication failure, e.g., display an error message
    console.error('Authentication failed');
  }
}

logout(): void {
  localStorage.removeItem(this.tokenStorageKey);
  this.userSubject.next(null);
}

resetPasswordRequest(email: string): Observable<string> {
  const url = `${this.BaseUrl}/register/password-reset-request`;
  const passwordRequestUtil = { email };
  return this.http.post<string>(url, passwordRequestUtil)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error during password reset request:', error);
        return throwError('Failed to send password reset request.'); // Use throwError to propagate the error
      })
    );
}
resetPassword(passwordRequestUtil: any, token: string): Observable<string> {
  const url = `${this.BaseUrl}/register/reset-password?token=${token}`;
  return this.http.post<string>(url, passwordRequestUtil);
}

changePassword(requestUtil: any): Observable<string> {
  const url = `${this.BaseUrl}/register/change-password`;
  return this.http.post<string>(url, requestUtil);
}

}