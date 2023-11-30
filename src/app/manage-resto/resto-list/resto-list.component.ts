import {Component, OnInit} from '@angular/core';
import {Restaurant} from "../Model/Restaurant";
import {RestoServiceService} from "../resto-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resto-list',
  templateUrl: './resto-list.component.html',
  styleUrls: ['./resto-list.component.scss']
})
export class RestoListComponent implements OnInit{
  restaurants: Restaurant[] = [];
  plats: any[];
  constructor(private restoService: RestoServiceService,private router: Router) {}

  ngOnInit() {

      this.loadRestaurants();
    }

    loadRestaurants()
    {
      this.restoService.fetchRestaurant().subscribe(
        (data: Restaurant[]) => {
          this.restaurants = data;
          console.log('Restaurants:', this.restaurants);
        },
        (error) => {
          console.error('Error fetching restaurants', error);
        }
      );
    }
  navigateToDetail(restaurantId: number) {
    // Navigate to the detailrestaurant component with the selected restaurant's ID
    this.router.navigate(['restaurants/restodetail', restaurantId]);
  }


}

