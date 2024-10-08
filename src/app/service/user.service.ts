import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8099/AUTHENTIFICATION-SERVICE/auth';
  }

  public registerUser(user:User): Observable<any> {
    console.log(user)
    return this.http.post<any>(`${this.apiUrl}/registerUser`,user);
  }
}
