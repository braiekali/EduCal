import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUniversityDialogDashComponent } from '../add-university-dialog-dash/add-university-dialog-dash.component';
import {UniversiteService} from "../services/universite.service";
import {Universite} from "../models/Universite";
import Swal from 'sweetalert2';
import {UniversityUpdateComponent} from "../university-update/university-update.component";
import {FoyerService} from "../services/foyer.service";

@Component({
  selector: 'app-university-list-dash',
  templateUrl: './university-list-dash.component.html',
  styleUrls: ['./university-list-dash.component.scss'],
})
export class UniversityListDashComponent implements AfterViewInit {

  constructor(private addUniversiteDialog: MatDialog, private updateUniversiteDialog: MatDialog, private serviceUniv: UniversiteService) {
  }
  nomFoyer: any;
  dataSource: any;
  displayedColumns: string[] = ['idUniversite', 'nomUniversite', 'adresseUniversite', 'ville', 'descriptionUniversite', 'telUniversite', 'emailUinversite','Foyer', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.serviceUniv.getUniversites().subscribe(
      (data: any) => {
        this.dataSource = data;
        console.log("eeeeeeeeeee");
        this.dataSource = new MatTableDataSource(this.dataSource);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Une erreur est survenue :', error);
      }
    );

  }

  refreshData() {
    this.serviceUniv.getUniversites().subscribe(
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


  deleteUniversite(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ces données après suppression!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceUniv.deleteUniversite(id).subscribe(
          (data: any) => {

            this.refreshData();
          },
        );
      }
    });

  }

  openAddUniversityDialog(): void {
    const dialogRef = this.addUniversiteDialog.open(
      AddUniversityDialogDashComponent,
      {
        width: '550px', // Set the width as per your design
        // Add any other dialog configuration options here
      }
    );

  }

  openUniversityUpdate(universite: any) {
    const dialogRef = this.updateUniversiteDialog.open(UniversityUpdateComponent, {
      width: '400px',
      data: universite,
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
