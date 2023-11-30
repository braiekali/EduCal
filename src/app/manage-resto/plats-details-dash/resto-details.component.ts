import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RestoServiceService} from "../resto-service.service";

@Component({
  selector: 'app-resto-details',
  templateUrl: './resto-details.component.html',
  styleUrls: ['./resto-details.component.scss']
})
export class RestoDetailsComponent implements OnInit{
  platId: number;
  platDetails: any; // Replace 'any' with the actual type of your Plat entity

  constructor(private route: ActivatedRoute, private platService: RestoServiceService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.platId = +params['id']; // '+' converts string to number
      this.loadPlatDetails();
    });
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
