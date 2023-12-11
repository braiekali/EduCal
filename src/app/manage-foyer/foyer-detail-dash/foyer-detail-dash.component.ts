import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FoyerService } from '../service/foyer.service';
import { Foyer } from '../model/Foyer';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BlocService } from '../service/bloc.service';
import { Bloc } from '../model/Bloc';

@Component({
  selector: 'app-foyer-detail-dash',
  templateUrl: './foyer-detail-dash.component.html',
  styleUrls: ['./foyer-detail-dash.component.scss']
})
export class FoyerDetailDashComponent implements AfterViewInit {
  foyerDetails: Foyer;
  dataSource: any;
  blocs: Bloc[] = [];
  idFoyer: number;
  displayedColumns: string[] = ['name', 'email', 'tel', 'state', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private foyerService: FoyerService, private addUserDialog: MatDialog,
    private route: ActivatedRoute, private blocService: BlocService) { }


  ngOnInit(): void {
    this.loadFoyerDetails();
    console.log(this.idFoyer)
    this.dataSource.paginator = this.paginator;
  }


  private loadFoyerDetails(): void {
    this.route.params.subscribe(({ id }) => {
      const foyerId = +id;
      this.foyerService.setFoyerId(id);
      this.foyerService.getFoyerById(foyerId).subscribe(
        (foyer) => {
          this.foyerDetails = foyer;
          this.getBlocsByFoyerId(foyerId);
        },

        (error) => console.error('Error retrieving foyer by ID:', error)
      );

    });

  }



  private getBlocsByFoyerId(foyerId: number): void {
    this.blocService.getBlocsByFoyerId(foyerId).subscribe(
      (blocs) => {
        this.blocs = blocs;

      },
      (error) => {
        console.error('Erreur lors de la récupération des blocs par foyer ID:', error);
      }
    );
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


}

