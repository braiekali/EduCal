import { Bloc } from "./Bloc";

export interface Foyer {
    idFoyer: number;
    nomFoyer: string;
    capaciteFoyer: number;
    superficie: number
    imageFoyer: string;
    likeFoyer: number;
    dislikeFoyer: number;
    blocs: Bloc[];
}

