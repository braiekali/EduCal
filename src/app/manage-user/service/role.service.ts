import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Role } from '../model/role';
import { environment } from 'app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private http: HttpClient) {}

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(environment.url +`/admin/addrole`, role);
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(environment.url +`/admin/role/${id}`);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.url +`/admin/roles`);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(environment.url +`/admin/deleterole/${id}`);
  }

  updateRole(role : Role){
    return this.http.put<any>(environment.url +`/admin/updaterole`,role);
  }
  


  findRoleByName(name: string): Observable<Role> {
    return this.http.get<Role>(environment.url +`/admin/role/${name}`);
  }
}