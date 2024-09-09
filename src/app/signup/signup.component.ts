import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {User} from "../model/user";
import {Role} from "../model/role";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signUpForm: FormGroup;
  user : User = {
    email: '', id: 0, password: '', telephone: '', role: Role.USER, username: ''
  }
  message:  string = '';

  constructor(private fb: FormBuilder,private userService:UserService,private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]]
    });
  }

  onSubmit() {
    this.user.username = this.signUpForm.get('username')?.value;
    this.user.email = this.signUpForm.get('email')?.value;
    this.user.password = this.signUpForm.get('password')?.value;
    this.user.telephone = this.signUpForm.get('phone')?.value;

    if (this.user.username && this.user.email && this.user.password && this.user.telephone) {
      if (this.signUpForm.valid) {
        this.userService.registerUser(this.user).subscribe(data=>{
          console.log(data);
          this.message='Compte créer avec succées';
        });
      } else {
        console.log('Remplit toutes les champs !!');
      }
    }
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigateByUrl("/");
  }
}
