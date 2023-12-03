import {AfterViewInit, Component} from '@angular/core';
import {Chambre} from "../model/chambre";
import {Reservation} from "../model/reservation";
import {MatDialog} from "@angular/material/dialog";
import {ChambreService} from "../chambre.service";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chambre-detail-dash',
  templateUrl: './chambre-detail-dash.component.html',
  styleUrls: ['./chambre-detail-dash.component.scss']
})
export class ChambreDetailDashComponent {

  imageUrl: string | ArrayBuffer | null;

  getImage(file: any) {
    this.s.getImage(file).subscribe(
      (result: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(result);
        return this.imageUrl;
      }
    )

  }

  constructor(private activatedroute: ActivatedRoute, private s: ChambreService) {
  }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.params['id'];
    this.s.fetchChambreById(this.id).subscribe(
      (result) => {
        this.element_data = result
        this.getImage(this.element_data.imageUrl)
      }
    )

  }

  id: any;
  element_data: any;

  Showupdate = false;
  reservationtoupdate: any;

  showForm(reservation: any) {
    this.reservationtoupdate = reservation;
    this.Showupdate = true;
  }

  afterrecieveData(e: any) {
    this.Showupdate = false;
    console.log(e);
    if (e.estValide == 'Oui') {
      e.estValide = 1;

          this.s.sendEmail(e).subscribe(
            () => {
              this.s.updateReservation(e).subscribe();
              alert("Email de validation envoyé avec succès !!");
              console.log("email envoyer pour le reservation : ",e.idReservation);
            }
          )

    } else {
      e.estValide = 0;
      this.s.updateReservation(e).subscribe(
      )
    }

  }

  deleteReservation(element: any) {
    this.s.removeReservation(element.idReservation).subscribe();
    console.log("supprimer reservation id : ", element.idReservation);
  }
}
