import {User} from "./User";
import {Chambre} from "./chambre";

export class Reservation {
  idReservation!: number | null;
  anneeUniv!: string|null;
  estValide!: boolean|null;
  user!: User;
  chambre!:Chambre;
}
