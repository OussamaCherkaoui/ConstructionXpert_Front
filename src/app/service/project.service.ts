import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/PROJECT/apiProject';
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

  public getAllProject():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`, { headers: this.getHeaders() });
  }

  public saveProject(project:Project): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/saveProject`,project, { headers: this.getHeaders() });
  }

  public updateProject(project:Project): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateProject`,project, { headers: this.getHeaders() });
  }

  public deleteProject(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteProject/${id}`, { headers: this.getHeaders() });
  }
}
