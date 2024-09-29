import { Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {UserDashbordComponent} from "./user-dashbord/user-dashbord.component";
import {ListProjectComponent} from "./list-project/list-project.component";
import {ListTaskComponent} from "./list-task/list-task.component";
import {ListRessourceComponent} from "./list-ressource/list-ressource.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: SignupComponent},
  { path: 'admin', component: AdminComponent},

  {  path: 'user',
    component:UserDashbordComponent,
    children:[
      { path : 'project', component:ListProjectComponent},
      { path : 'task/:id', component:ListTaskComponent},
      { path : 'resource/:id' , component:ListRessourceComponent},

    ] },
];
