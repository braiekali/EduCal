export interface Plat {
  idPlat: number;
  nomPlat: string;
  description: string;
  prixPlat: number;
  restaurant: {
    idRestaurant: number;
  };
}
