import {AfterViewInit, Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {ActualiteService} from "../services/actualite.service";

@Component({
  selector: 'app-news-details-dash',
  templateUrl: './news-details-dash.component.html',
  styleUrls: ['./news-details-dash.component.scss']
})
export class NewsDetailsDashComponent implements AfterViewInit{
  newsDetails: any;
  idActualite: number;
  constructor(private route: ActivatedRoute,private serviceNews:ActualiteService) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString != null) {
        this.idActualite = parseInt(idString, 10);
      }

      // Utiliser le service pour récupérer les détails de l'université
      this.serviceNews.getActualiteById(this.idActualite).subscribe(
        details => {
          this.newsDetails = details;
          // Vous pouvez également faire d'autres opérations avec les données ici
        },
        error => {
          console.error('Erreur lors de la récupération des détails de l\'université', error);
        }
      );
    });

  }

  ngAfterViewInit(): void {
  }
}
