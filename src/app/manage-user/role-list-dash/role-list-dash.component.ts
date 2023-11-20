import { Component } from '@angular/core';
// Import necessary modules
import {  OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from '../service/role.service'; // Replace with the actual path
import { Role } from 'app/manage-user/model/role';
import { AddRoleDialogDashComponent } from '../add-role-dialog-dash/add-role-dialog-dash.component';
import { Router } from '@angular/router';
import { EditRoleDialogDashComponent } from '../edit-role-dialog-dash/edit-role-dialog-dash.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-list-dash',
  templateUrl: './role-list-dash.component.html',
  styleUrls: ['./role-list-dash.component.scss']
})
export class RoleListDashComponent {

constructor(private addRoleDialog: MatDialog, private updateRoleDialog: MatDialog, private serviceRole: RoleService) {
}

dataSource: any;
displayedColumns: string[] = ['id', 'name', 'action'];
@ViewChild(MatPaginator) paginator!: MatPaginator;

ngOnInit(): void {
  this.serviceRole.getAllRoles().subscribe(
    (data: any) => {
      this.dataSource = data;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource)
    },
    (error) => {
      console.error('Une erreur est survenue :', error);
    }
  );
  //this.dataSource = new MatTableDataSource(this.dataSource);
  //this.dataSource.paginator = this.paginator;
}

refreshData() {
  this.serviceRole.getAllRoles().subscribe(
    (data: any) => {
      this.dataSource = data;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource)
    },
  )
}

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}


deleteRole(idRole: number) {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas récupérer ces données après suppression!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.serviceRole.deleteRole(idRole).subscribe(
        (data: any) => {

          this.refreshData();
        },
      );
    }
  });

}

openAddRoleDialog(): void {
  const dialogRef = this.addRoleDialog.open(
    AddRoleDialogDashComponent,
    {
      width: '500px', // Set the width as per your design
      // Add any other dialog configuration options here
    }
  );

}

openRoleUpdate(role: any) {
  const dialogRef = this.updateRoleDialog.open(EditRoleDialogDashComponent, {
    width: '500px',
    data: role,
  });


  dialogRef.afterClosed().subscribe((result) => {
    // Gérer le résultat après la fermeture du dialogue (si nécessaire)
    if (result) {
      console.log('Le dialogue a été fermé avec succès', result);
    } else {
      console.log('Le dialogue a été fermé', result);
    }
  });

}
}
