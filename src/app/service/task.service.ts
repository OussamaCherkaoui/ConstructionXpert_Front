import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../model/task";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/TASK/apiTask';
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

  public getAllTaskByIdProject(id:number):Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getTaskByIdProject/${id}`,{ headers: this.getHeaders() });
  }

  public saveTask(task:Task): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/saveTask`,task, { headers: this.getHeaders() });
  }

  public updateTask(task:Task): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateTask`,task, { headers: this.getHeaders() });
  }

  public deleteTask(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteTask/${id}`, { headers: this.getHeaders() });
  }

}
