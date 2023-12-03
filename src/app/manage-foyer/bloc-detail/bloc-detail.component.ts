import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Bloc } from '../model/Bloc';
import { Foyer } from '../model/Foyer';
import { FoyerService } from '../service/foyer.service';
import { BlocService } from '../service/bloc.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bloc-detail',
  templateUrl: './bloc-detail.component.html',
  styleUrls: ['./bloc-detail.component.scss']
})
export class BlocDetailComponent implements AfterViewInit {
  idBloc: number;
  bloc: Bloc;
  chambres: any;
  blocs: Bloc[] = [];
  chambre: any
  foyer: Foyer;
  idFoyer: number;
  dataSource: any;
  displayedColumns: string[] = ['numeroChambre', 'typeChambre', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private foyerService: FoyerService, private route: ActivatedRoute, private blocService: BlocService) { }


  ngOnInit(): void {
    this.blocService.blocDetails$.subscribe((idFoyer) => {
      this.idFoyer = idFoyer;
    });

    this.foyerService.foyerId$.subscribe((idBloc) => {
      this.idBloc = idBloc;
    });

    this.route.params.subscribe((params) => {
      this.idFoyer = +params['idFoyer'];
      this.idBloc = +params['idBloc'];

      this.blocService.getBlocByIdFoyerAndIdBloc(this.idFoyer, this.idBloc).subscribe(
        (bloc) => {
          this.bloc = bloc;

        },
        (error) => {
          console.error('Erreur lors de la récupération du bloc :', error);
          console.log(this.idBloc);
          console.log(this.idFoyer);

        }
      );
    });

    this.blocService.getChambresByFoyerAndBloc(this.idFoyer, this.idBloc).subscribe(
      (data) => {
        this.chambres = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des chambres : ', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


}








