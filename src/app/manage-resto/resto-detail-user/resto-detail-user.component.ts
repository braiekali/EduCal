import {Component, OnInit} from '@angular/core';
import {RestoServiceService} from "../resto-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-resto-detail-user',
  templateUrl: './resto-detail-user.component.html',
  styleUrls: ['./resto-detail-user.component.scss']
})
export class RestoDetailUserComponent implements OnInit{
  idRestaurant: number;
  ELEMENT_DATA: any;
  plats: any[];
  platDetails: any
  platId: number;
  test = "http://localhost:8082/upload-directory/";
  constructor( private platService: RestoServiceService, private restoService:RestoServiceService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idRestaurant = +params['id']; // Convert the parameter to a number
      // Fetch and set the details of the selected restaurant using the restaurantId
      // You might want to make an HTTP request or use a service to get the data
      this.fetchRestaurantDetails();

      // Call fetchPlats to fetch and set the list of plats
      this.fetchPlats();
    });
  }
  fetchRestaurantDetails() {
    // Fetch restaurant details based on this.restaurantId
    this.restoService.getRestaurantById(this.idRestaurant).subscribe(
      (data: any) => {
        this.ELEMENT_DATA = data;
      },
      error => {
        console.error('Error fetching restaurant details:', error);
      }
    );
  }

  fetchPlats() {
    // Fetch plats based on this.restaurantId
    this.restoService.findByRestaurant_IdRestaurant(this.idRestaurant).subscribe(
      (data: any) => {
        this.plats = data;
      },
      error => {
        console.error('Error fetching plats:', error);
      }
    );
  }

  navigateToDetails(id: number): void {
    if (id !== undefined && id !== null) {
      this.router.navigate(['/restaurants/Plats-detail', id]);
    } else {
      console.error('Invalid id:', id);
      // Handle the case where id is not valid, e.g., show an error message.
    }
  }

  loadPlatDetails() {
    this.platService.getPlatById(this.platId).subscribe(
      (data) => {
        this.platDetails = data;
      },
      (error) => {
        console.error('Error fetching plat details', error);
      }
    );
  }
}


