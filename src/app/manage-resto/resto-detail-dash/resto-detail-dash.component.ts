import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AddNewsDialogDashComponent} from "../../manage-university/add-news-dialog-dash/add-news-dialog-dash.component";
import {ActivatedRoute, Router} from "@angular/router";
import {RestoServiceService} from "../resto-service.service";
import {Plat} from "../Model/Plat";
import {AddPlatsDialogDashComponent} from "../add-plats-dialog-dash/add-plats-dialog-dash.component";
import {UpdatePlatDashComponent} from "../update-plat-dash/update-plat-dash.component";


@Component({
  selector: 'app-resto-detail-dash',
  templateUrl: './resto-detail-dash.component.html',
  styleUrls: ['./resto-detail-dash.component.scss']
})
export class RestoDetailDashComponent implements OnInit{
  ELEMENT_DATA: any = [
   ]
  constructor(private router: Router ,private addUserDialog: MatDialog,private activatedRoute: ActivatedRoute,
              private restoService: RestoServiceService) {}

  dataSource: any;
  displayedColumns: string[] = ['Image','nomPlat', 'prixPlat', 'description', 'action',];
  test = "http://localhost:8082/upload-directory/";
  platsDataSource: MatTableDataSource<Plat> = new MatTableDataSource<Plat>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  idPlat: number;
  updatedPlat: Plat;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idRestaurantParam = params.get('id');

      // Check if idRestaurantParam is not null before converting
      if (idRestaurantParam !== null) {
        const restaurantId = +idRestaurantParam;

        // Call the service method to get restaurant details
        this.restoService.getRestaurantById(restaurantId).subscribe(
          (data: any) => {
            this.ELEMENT_DATA = data;
           // Fetch plats associated with the restaurant
            this.restoService.findByRestaurant_IdRestaurant(restaurantId).subscribe(
              (plats: Plat[]) => {
                this.platsDataSource.data = plats;

              },
              (error) => {
                console.error('Error fetching plats:', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching restaurant details:', error);
          }
        );
      } else {
        console.error('Restaurant ID is null');
      }
    });


    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;

    this.restoService.fetchPlat().subscribe(
      (data: any) => {
        this.dataSource = data;
      })

  }

  openAddNewsDialog(): void {

    const dialogRef = this.addUserDialog.open(AddNewsDialogDashComponent, {
      width: '550px', // Set the width as per your design
      // Add any other dialog configuration options here
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

  openAddPlatsDialog(): void {
    const dialogRef = this.addUserDialog.open(AddPlatsDialogDashComponent, {
      width: '550px',
      data: { restaurantId: this.ELEMENT_DATA.idRestaurant }
      // Add any other dialog configuration options for AddPlatsDialogDashComponent here
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result after the dialog is closed (if needed)
      if (result) {
        console.log('The AddPlatsDialogDashComponent dialog was closed', result);
        // Refresh the plats list after adding a new plat
        window.location.reload();
      } else {
        console.log('The AddPlatsDialogDashComponent dialog was closed', result);
      }
    });
  }



  openUpdatePlatDialog(plat:any): void {
    const dialogRef = this.addUserDialog.open(UpdatePlatDashComponent, {
        width: '550px',
      data: plat
        // Add any other dialog configuration options for AddPlatsDialogDashComponent here
      });

      dialogRef.afterClosed().subscribe((result) => {
        window.location.reload();

        // Handle the result after the dialog is closed (if needed)
        if (result) {
          console.log('Plat updated:', result);
          // Call the update method with the plat ID and updated plat data

        }
      });
    }


  deletePlat(idPlat: number): void {


    if (confirm('Are you sure you want to delete this Plat?')) {
      this.restoService.deletePlat(idPlat).subscribe(
        (data: any) => {
          window.location.reload();
          // Handle success, refresh the data

        },
        (error) => {
          console.error('Error deleting restaurant:', error);
        }
      );
    }
  }

  navigateToDetails(id: number): void {
    if (id !== undefined && id !== null) {
      this.router.navigate(['/dashboard/restaurants/plats', id]);
    } else {
      console.error('Invalid id:', id);
      // Handle the case where id is not valid, e.g., show an error message.
    }
  }
}
