import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {UtilisateurService} from "./utilisateur.service";

@Injectable({
  providedIn: 'root'
})
export class DecodejwtService {

  token: string ='' ;

  constructor(private srv:UtilisateurService ) {

  }

  public getToken(){
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwt')||'';
    }
  }

  public decodeToken(token: string ) {
    return jwtDecode(token);
  }
  public getUsernameFromToken() :any{
    this.getToken();
    const decodedToken = this.decodeToken(this.token);
    return decodedToken.sub;
  }
  public getIdByUsername() {
    const username = this.getUsernameFromToken()
    return this.srv.findIdByUsername(username);
  }

}
