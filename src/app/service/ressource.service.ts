import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ressource} from "../model/ressource";

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8099/RESSOURCE/apiRessource';
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No auth token found');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public getAllRessourceByIdTask(id: number | undefined,page:number,ascending:boolean):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getRessourceByIdTask/${id}/${page}/${ascending}`,{ headers: this.getHeaders() });
  }

  public saveRessource(ressource:Ressource): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/saveRessource`,ressource, { headers: this.getHeaders() });
  }

  public updateRessource(ressource:Ressource): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateRessource`,ressource, { headers: this.getHeaders() });
  }

  public deleteRessource(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteRessource/${id}`, { headers: this.getHeaders() });
  }

  public searchRessourcesByType(idTaskSelected: number | undefined, typeSearched: string) {
    return this.http.get<any>(`${this.apiUrl}/getRessourceByType/${idTaskSelected}/${typeSearched}`,{ headers: this.getHeaders() });
  }
}
