import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private localStorage:LocalStorageService,
              private messageService:MessageService,
              private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {

      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(
        response => {
          this.messageService.add({severity:'info', summary: 'Info', detail: "Login successfully."});
          this.localStorage.set("token", response.data.token)
          this.localStorage.set("userId", response.data.id)
          this.localStorage.set("email", this.loginForm.get("email")?.value)
          this.router.navigate(['/home']);
        },
        responseError => {
    this.messageService.add({severity:'error', summary: 'Error', detail: responseError.error});

        })
      }
  }

}
