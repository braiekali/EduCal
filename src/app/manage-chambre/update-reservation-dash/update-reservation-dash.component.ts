import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Chambre} from "../model/chambre";
import {Reservation} from "../model/reservation";

@Component({
  selector: 'app-update-reservation-dash',
  templateUrl: './update-reservation-dash.component.html',
  styleUrls: ['./update-reservation-dash.component.scss']
})
export class UpdateReservationDashComponent {
  @Input() reservation_data: any ;
  @Output() sendmsg = new EventEmitter();

  // user="Utilisateur ";


  sendDataToParent() {
    this.sendmsg.emit(this.reservation_data);
  }
}
