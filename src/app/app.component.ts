import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserDashbordComponent} from "./user-dashbord/user-dashbord.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserDashbordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ConstructXpert_Front';
}
