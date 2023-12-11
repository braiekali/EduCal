import {Reservation} from "./reservation";
import {Bloc} from "./Bloc";

export class Chambre {

  idChambre!: number |null;
  numeroChambre!: string|null;
  typeChambre!: string|null;
  bloc!: Bloc|null;
  reservation!: string|null;
  // image!: string;

}
