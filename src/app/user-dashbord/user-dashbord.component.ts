import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ListProjectComponent} from "../list-project/list-project.component";

@Component({
  selector: 'app-user-dashbord',
  standalone: true,
  imports: [
    RouterLink,
    ListProjectComponent
  ],
  templateUrl: './user-dashbord.component.html',
  styleUrl: './user-dashbord.component.css'
})
export class UserDashbordComponent {

}
