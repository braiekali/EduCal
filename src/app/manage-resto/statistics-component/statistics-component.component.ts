import {Component, OnInit} from '@angular/core';
import {RestoServiceService} from "../resto-service.service";

@Component({
  selector: 'app-statistics-component',
  templateUrl: './statistics-component.component.html',
  styleUrls: ['./statistics-component.component.scss']
})
export class StatisticsComponentComponent implements OnInit {
  totalDishesCount: number;
  averageDishPrice: number;
  totalRestaurantsCount: number;

  constructor(private restoService: RestoServiceService) {}

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.restoService.getTotalDishes().subscribe((count) => {
      this.totalDishesCount = count;
    });

    this.restoService.getAverageDishPrice().subscribe((avgPrice) => {
      this.averageDishPrice = avgPrice;
    });

    this.restoService.getTotalRestaurants().subscribe((count) => {
      this.totalRestaurantsCount = count;
    });
  }
}

