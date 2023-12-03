import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UniversiteService} from "../services/universite.service";
import {ActualiteService} from "../services/actualite.service";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent {
  actualiteDetails: any;
  idActualite: number;
  dataSource: any;
  constructor(private route: ActivatedRoute,private serviceAct:ActualiteService) {
  }
ngOnInit(){
  this.route.paramMap.subscribe(params => {
    const idString = params.get('id');
    if (idString != null) {
      this.idActualite = parseInt(idString, 10);
    }

    // Utiliser le service pour récupérer les détails de l'université
    this.serviceAct.getActualiteById(this.idActualite).subscribe(
      details => {
        this.actualiteDetails = details;
        // Vous pouvez également faire d'autres opérations avec les données ici
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'université', error);
      }
    );
  });
}
}
