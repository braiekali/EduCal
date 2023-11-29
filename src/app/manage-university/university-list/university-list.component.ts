import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UniversiteService} from "../services/universite.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ActualiteService} from "../services/actualite.service";

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})
export class UniversityListComponent implements OnInit{
  dataSource: any;
  constructor(private serviceUniv: UniversiteService) {
  }

  ngOnInit(): void {
    this.serviceUniv.getUniversites().subscribe(
      (data: any) => {

        this.dataSource = data;
      },

    );

  }


}
