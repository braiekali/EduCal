import { Component } from '@angular/core';
// Import necessary modules
import {  OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from '../service/role.service'; // Replace with the actual path
import { Role } from 'app/manage-user/model/role';
import { AddRoleDialogDashComponent } from '../add-role-dialog-dash/add-role-dialog-dash.component';

@Component({
  selector: 'app-role-list-dash',
  templateUrl: './role-list-dash.component.html',
  styleUrls: ['./role-list-dash.component.scss']
})
export class RoleListDashComponent {

displayedColumns: string[] = ['id', 'name', 'action'];
dataSource: MatTableDataSource<Role>;
loading = false;
roles: Role[];
@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private addRoleDialog: MatDialog, private roleService: RoleService) {
  this.dataSource = new MatTableDataSource<Role>();
}

ngOnInit(): void {
  // Remove this.userService.getAllUsers() from here
  this.loadRoles();
}

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

deleteRoleById(idRole: number): void {
  if (!idRole) {
    console.error('User ID is undefined or null.');
    // Ajoutez une gestion d'erreur ici si nécessaire
    return;
  }

  if (window.confirm('Are you sure you want to delete this user?')) {
    this.roleService.deleteRole(idRole).subscribe(
      () => {
        console.log(`User with ID ${idRole} deleted successfully.`);
        // Mettez à jour la liste des utilisateurs ou rafraîchissez la page ici si nécessaire
      },
      (error) => {
        console.error('Error deleting user:', error);
        // Affichez un message d'erreur à l'utilisateur ici si nécessaire
      }
    );
  }
}

openAddRoleDialog(): void {
  const dialogRef = this.addRoleDialog.open(
    AddRoleDialogDashComponent,
    {
      width: '550px', // Set the width as per your design
      // Add any other dialog configuration options here
    }
  );

  dialogRef.afterClosed().subscribe((result) => {
    // Handle the result after the dialog is closed (if needed)
    if (result) {
      console.log('The dialog save pressed', result);
    } else {
      console.log('The dialog was closed', result);
    }
  });
}

loadRoles(): void {
  console.log('Fetching roles...');
  this.loading = true;

  this.roleService.getAllRoles().subscribe(
    (roles) => {
      console.log('Roles fetched successfully:', roles);
      this.dataSource.data = roles;
    },
    (error) => {
      console.error('Error loading roles:', error);
      // Handle error, e.g., show a user-friendly message
    },
    () => {
      console.log('Request completed.');
      this.loading = false;
    }
  );
}}
