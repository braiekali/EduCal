import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChambreService} from "../chambre.service";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  constructor(private s: ChambreService) {
  }

  user = 1;

  datas: any = [];

  ngOnInit() {

    this.refresh();

  }

  refresh() {
    this.s.getReservationByIdUser(this.user).subscribe((result) => {
        this.datas = result;
        console.log("resultat", result);
        console.log("element 1:", this.datas);

      }
    );
  }

  test() {
    console.log("element :", this.datas);
  }

  removeReservation(id: any) {
    this.s.removeReservation(id).subscribe(
      () =>     this.refresh()

  )
  }




}
