import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from "@angular/material/card";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Utilisateur} from "../model/utilisateur";
import {AuthenticationRequest} from "../model/authentication-request";
import {DecodejwtService} from "../service/decodejwt.service";
import {Role} from "../model/role";
import {Router} from "@angular/router";
import {UtilisateurService} from "../service/utilisateur.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardContent,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  user!:Utilisateur;
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  error:  string = '';
  authRequest: AuthenticationRequest = { username: '', password: '' };

  constructor(private fb: FormBuilder,private srvd:DecodejwtService,private authService: UtilisateurService,private router: Router) {}


  login(): void {
    this.authRequest.username=this.form.get('username')?.value!;
    this.authRequest.password=this.form.get('password')?.value!;

    this.authService.login(this.authRequest).subscribe(
      response => {
        if (response && response.token) {
          localStorage.setItem("jwt", response.token);
          this.srvd.getToken();
          this.srvd.getIdByUsername().subscribe(
            id => {
              this.authService.setIdUser(id);
              this.authService.getUserById(id).subscribe(res => {
                this.user = res;
                this.authService.loginActive();
                if (this.user.role === Role.ADMIN) {
                  this.router.navigateByUrl("/admin");
                } else if (this.user.role === Role.USER){
                  this.router.navigateByUrl(`/home`);
                }
              });
            }
          );
        } else {
          this.error = "username ou password incorrect";
        }
      },
      error => {
        this.error = "erreur lors d' authentification. Réssayer!!";
      }
    );
  }

  ngOnInit(): void {
  }

}
