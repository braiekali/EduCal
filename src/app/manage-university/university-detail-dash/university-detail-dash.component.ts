import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddNewsDialogDashComponent } from '../add-news-dialog-dash/add-news-dialog-dash.component';
import {ActivatedRoute} from "@angular/router";
import {UniversiteService} from "../services/universite.service";
import {ActualiteService} from "../services/actualite.service";
import Swal from "sweetalert2";
import {UniversityUpdateComponent} from "../university-update/university-update.component";
import {NewsUpdateComponent} from "../news-update/news-update.component";


@Component({
  selector: 'app-university-detail-dash',
  templateUrl: './university-detail-dash.component.html',
  styleUrls: ['./university-detail-dash.component.scss'],
})
export class UniversityDetailDashComponent implements AfterViewInit {
  universityDetails: any;
  idUniversite: number;
  imageBasePath: string = 'http://localhost:8082/upload-directory/';

  constructor(private addNewsDialog: MatDialog, private updateNewsDialog: MatDialog,private route: ActivatedRoute,private serviceUniv:UniversiteService,private serviceAct: ActualiteService) {}

  dataSource: any;
  displayedColumns: string[] = ['idActualite', 'titreActualite', 'description', 'dateActualite', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString != null) {
        this.idUniversite = parseInt(idString, 10);
      }

      // Utiliser le service pour récupérer les détails de l'université
      this.serviceUniv.getUniversiteById(this.idUniversite).subscribe(
        details => {
          this.universityDetails = details;
          // Vous pouvez également faire d'autres opérations avec les données ici
        },
        error => {
          console.error('Erreur lors de la récupération des détails de l\'université', error);
        }
      );
    });
    this.serviceAct.getActualiteByUniversiteId(this.idUniversite).subscribe(

        (data: any) => {


          console.log(data);
          this.dataSource = data;
          this.dataSource = new MatTableDataSource(this.dataSource);
          this.dataSource.paginator = this.paginator;
      }

    )

  }

  deleteActualite(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ces données après suppression!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAct.deleteActualite(id).subscribe(
          (data: any) => {

            this.refreshData();
          },
        );
      }
    });

  }
  refreshData() {
    this.serviceAct.getActualites().subscribe(
      (data: any) => {
        this.dataSource = data;
        this.dataSource = new MatTableDataSource(this.dataSource);
        this.dataSource.paginator = this.paginator;
      },
    )
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openAddNewsDialog(id:number): void {
    const dialogRef = this.addNewsDialog.open(AddNewsDialogDashComponent, {
      width: '550px',
      data: { idUniversite: id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result after the dialog is closed (if needed)
      if (result) {
        console.log('The dialog save pressed', result);
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }
  openNewsUpdate(news: any,id:any) {
    const dialogRef = this.updateNewsDialog.open(NewsUpdateComponent, {
      width: '400px',
      data: { news: news, id: id }
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
