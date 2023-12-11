
export interface Bloc {

  idBloc: number;
  nomBloc: string;
  capaciteBloc: number;
  nombreEtage: number;
  imageBloc: string;
  foyer: {
    idFoyer: number;
    nomFoyer:string;
  };
  chambres: any[];
}