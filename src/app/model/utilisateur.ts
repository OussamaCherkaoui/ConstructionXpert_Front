import {Role} from "./role";

export class Utilisateur {
  id?:number;
  username: string | undefined;
  password: string|undefined;
  email: string|undefined;
  telephone: string|undefined;
  role?:Role;

  constructor(data?: Partial<Utilisateur>) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.password = data.password;
      this.email = data.email;
      this.telephone = data.telephone;
      this.role = data.role;
    }
  }
}
