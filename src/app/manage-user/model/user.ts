import { Role } from "./role";
 
export class User {
  idUser: number;
  firstName: string;
  lastName: string;
  password: string;
  phone: number;
  email: string;
  cin: number;

  active: boolean;
  enabled: boolean; 
  roles: Role[]; 
}




