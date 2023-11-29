import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { AddUserDialogDashComponent } from '../add-user-dialog-dash/add-user-dialog-dash.component';
import { UserService } from '../service/user.service';
import { User } from '../model/user'; // Update the path
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { EditUserDialogDashComponent } from '../edit-user-dialog-dash/edit-user-dialog-dash.component';
// Import statements...
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'app/pages/authentication/auth.service';


@Component({
  selector: 'app-user-list-dash',
  templateUrl: './user-list-dash.component.html',
  styleUrls: ['./user-list-dash.component.scss'],
})
export class UserListDashComponent implements AfterViewInit, OnInit {
  dataSource: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'active', 'isEnabled', 'roles', 'action'];
  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg';
  searchTerm: string;

  user: User | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredData: any[] = [];
  searchText = '';
  constructor(private addUserDialog: MatDialog ,private userService: UserService, private dialog: MatDialog , private router: Router , ) {
   
  }

  ngOnInit(): void {
    
    this.userService.getAllUsers().subscribe(
      
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
  }
  refreshData() {
    if (this.searchTerm) {
      this.userService.findByCin(parseInt(this.searchTerm))
        .subscribe(user => {
          this.user = user;
          this.dataSource = new MatTableDataSource([user]); // Mettre à jour la source de données avec le résultat de la recherche
        });
    } else {
      this.userService.getAllUsers().subscribe(
        (data: any) => {
          this.dataSource = data;
          this.dataSource = new MatTableDataSource(this.dataSource);
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
 
  

  deleteUserById(idUser: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ces données après suppression!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result: any) => {  // Spécifiez explicitement le type 'any' ici
      if (result.isConfirmed) {
        this.userService.deleteUser(idUser).subscribe(
          (data: any) => {
            this.refreshData();
          },
        );
      }
    });
  }
  


  openAddUserDialog(): void {
    const dialogRef = this.addUserDialog.open(
      AddUserDialogDashComponent,
      {
        width: '500px', // Set the width as per your design
        // Add any other dialog configuration options here
      }
    );

  }


  openUserUpdate(user: any) {
    const dialogRef = this.dialog.open(EditUserDialogDashComponent, {
      width: '500px',
      data: user,
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      // Gérer le résultat après la fermeture du dialogue (si nécessaire)
      if (result) {
        console.log('Le dialogue a été fermé avec succès', result);
      } else {
        console.log('Le dialogue a été fermé', result);
      }
    });
  }

  getUserByCin(cin: number): void {
    this.userService.findByCin(parseInt(this.searchTerm))
  .subscribe(user => {
    this.user = user;
    this.dataSource = new MatTableDataSource([user]); // Mettre à jour la source de données avec le résultat de la recherche
  });}
  
  searchUser(): void {
    console.log('Numéro de CIN avant l\'appel au service :', this.searchTerm);
  
    if (this.searchTerm) {
      this.userService.findByCin(parseInt(this.searchTerm))
        .subscribe(user => {
          this.user = user;
          this.updateDataSource([user]); // Mise à jour de la source de données
          console.log('Utilisateur trouvé :', user);
          this.refreshData(); // Appel à la méthode refreshData() pour mettre à jour la source de données
        });
    } else {
      // Si la recherche est vide, afficher la liste complète
      this.userService.getAllUsers()
        .subscribe(users => {
          this.user = null;
          this.updateDataSource(users); // Mettre à jour la source de données avec la liste complète
          this.refreshData(); // Appel à la méthode refreshData() pour mettre à jour la source de données
        });
    }
  }

  onSearchChange() {
    // Reset the filteredData array
    this.filteredData = [];

    // Check if the search text is empty
    if (!this.searchText) {
      this.filteredData = this.dataSource;
      return;
    }

    // Perform the search based on the searchText
    this.filteredData = this.dataSource.filter((item: { cin: number; firstName: string; email: String; }) => {
      // Customize the search criteria as per your requirements
      const fullSearch = `${item.cin} ${item.firstName} ${item.email}`.toLowerCase();
      return fullSearch.includes(this.searchText.toLowerCase());
    });
  }
  updateDataSource(users: User[]) {
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
  }



}