import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

    return this.http.post<any>(environment.url +`/register`, body)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        catchError(error => throwError(error))
      );
  }

login(email: string, password: string): Observable<any> {
  const body = { email, password };

  return this.http.post<string>(environment.url +`/authenticate`, body, { responseType: 'text' as 'json' })
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
  const url = environment.url +`/register/password-reset-request`;
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
  const url = environment.url +`/register/reset-password?token=${token}`;
  return this.http.post<string>(url, passwordRequestUtil);
}


changePassword(newPassword: string, token: string) {
  const resetPasswordUrl = environment.url + `/register/reset-password`;
  const tokenQueryParam = `?token=${token}`;

  const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Set the Content-Type header

  return this.http.post(resetPasswordUrl + tokenQueryParam, { newPassword }, { headers, responseType: 'text' as 'json' });
}


}