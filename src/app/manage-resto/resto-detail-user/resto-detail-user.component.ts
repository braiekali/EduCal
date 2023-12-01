import {Component, OnInit} from '@angular/core';
import {RestoServiceService} from "../resto-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-resto-detail-user',
  templateUrl: './resto-detail-user.component.html',
  styleUrls: ['./resto-detail-user.component.scss']
})
export class RestoDetailUserComponent implements OnInit{
  idRestaurant: number;
  ELEMENT_DATA: any;
  plats: any[];
  test = "http://localhost:8082/upload-directory/";
  constructor( private restoService:RestoServiceService, private route: ActivatedRoute) {
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
}


