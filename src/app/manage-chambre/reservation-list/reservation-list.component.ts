import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChambreService} from "../chambre.service";
import { User } from '../model/User';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  constructor(private s: ChambreService) {
    const storedUserProfile = localStorage.getItem('userProfile');
    this.userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;
  }

  userProfile: User;
  datas: any = [];

  ngOnInit() {

    this.refresh();

  }

  refresh() {
    this.s.getReservationByIdUser(this.userProfile.idUser).subscribe((result) => {
        this.datas = result;
        console.log("resultat", result);
        console.log("element 1:", this.datas);

      },
      (err)=>{
        console.log(err)
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
