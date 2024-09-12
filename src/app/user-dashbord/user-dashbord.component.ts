import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ListProjectComponent} from "../list-project/list-project.component";

@Component({
  selector: 'app-user-dashbord',
  standalone: true,
  imports: [
    RouterLink,
    ListProjectComponent,
    RouterOutlet
  ],
  templateUrl: './user-dashbord.component.html',
  styleUrl: './user-dashbord.component.css'
})
export class UserDashbordComponent {

}
