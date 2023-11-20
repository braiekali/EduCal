import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/admin/addrole`, role);
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/admin/role/${id}`);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/admin/roles`);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/deleterole/${id}`);
  }

  updateRole(data:any){
    return this.http.put<Role>(`${this.baseUrl}/admin/updaterole`,data);
  }
  


  findRoleByName(name: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/admin/role/${name}`);
  }
}