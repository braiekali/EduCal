import {Component, OnInit} from '@angular/core';
import {RestoServiceService} from "../resto-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Plat} from "../Model/Plat";
import {RestoModule} from "../resto.module";

import { HighlightDirective } from '../highlight.directive';
@Component({
  selector: 'app-plats-details',
  templateUrl: './plats-details.component.html',
  styleUrls: ['./plats-details.component.scss'],

})
export class PlatsDetailsComponent implements OnInit{
  plats: any[];
  platId: number;
  platDetails: any; // Replace 'any' with the actual type of your Plat entity
  test = "http://localhost:8082/upload-directory/";
  constructor(private route: ActivatedRoute ,private platService: RestoServiceService, private restoService: RestoServiceService, private router: Router) {
  }
  customHighlightColor: string = 'lightblue';

  onHighlightEvent(event: string) {
    console.log(event); // Gérez l'événement émis par la directive
  }
  ngOnInit(): void {

      this.route.params.subscribe(params => {
        this.platId = +params['id']; // '+' converts string to number
        this.loadPlatDetails();
      });
    this.loadRestaurants();
  }
  loadRestaurants()
  {
    this.restoService.fetchPlat().subscribe(
      (data: Plat[]) => {
        this.plats = data;
        console.log('Restaurants:', this.plats);
      },
      (error) => {
        console.error('Error fetching restaurants', error);
      }
    );
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
