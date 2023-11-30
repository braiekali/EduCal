import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {
  AddUniversityDialogDashComponent
} from "../../manage-university/add-university-dialog-dash/add-university-dialog-dash.component";
import {RestoServiceService} from "../resto-service.service";
import {Restaurant} from "../Model/Restaurant";
import {AddRestoDialogDashComponent} from "../add-resto-dialog-dash/add-resto-dialog-dash.component";
import {UpdateRestauComponent} from "../update-restau/update-restau.component";

@Component({
  selector: 'app-resto-list-dash',
  templateUrl: './resto-list-dash.component.html',
  styleUrls: ['./resto-list-dash.component.scss']
})
export class RestoListDashComponent implements AfterViewInit{
  ELEMENT_DATA: Restaurant[]  = [

  ];

  constructor(private addUniversiteDialog: MatDialog, private updateDialogRef: MatDialog,private addUserDialog: MatDialog, private Rs:RestoServiceService) {}

  dataSource: any;
  displayedColumns: string[] = ['nomRestaurant', 'dateOuverture', 'dateFerme', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  test = "http://localhost:8082/upload-directory/";

  ngOnInit(): void {
    this.Rs.fetchRestaurant().subscribe(
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
    console.log('DataSource:', this.dataSource.data);

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openAddUniversityDialog(): void {
    const dialogRef = this.addUserDialog.open(
      AddRestoDialogDashComponent,
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

  openUpdateDialog(restaurant: any) {
  const dialogRef = this.updateDialogRef.open(UpdateRestauComponent, {
    width: '400px',
    data: restaurant,
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

  deleteRestaurant(id: number): void {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this.Rs.deleteRestaurant(id).subscribe(
        (data: any) => {
          // Handle success, refresh the data
          this.refreshData();
        },
        (error) => {
          console.error('Error deleting restaurant:', error);
        }
      );
    }
  }

  refreshData(): void {
    this.Rs.fetchRestaurant().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  protected readonly Date = Date;
}
