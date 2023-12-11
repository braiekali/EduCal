export interface Plat {
  idPlat: number;
  nomPlat: string;
  description: string;
  prixPlat: number;
  imagePlat:string;
  restaurant: {
    idRestaurant: number;
  };
}
