import { Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signUp', component: SignupComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'home', component: HomeComponent},
];
