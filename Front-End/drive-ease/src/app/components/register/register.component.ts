import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private messageService:MessageService,
              private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  register() {
    if(this.registerForm.valid) {

      let registerModel = Object.assign({},this.registerForm.value)

      this.authService.register(registerModel).subscribe(
        response => {
          // localStorage.setItem("token", response.data.token)
          this.messageService.add({severity:'success', summary: 'Success', detail: "Registration successful. You redirect to login page."});
          this.router.navigate(['/login']);
        },
        responseError => {
    this.messageService.add({severity:'error', summary: 'Error', detail: responseError.error});

        })
      }
  }

}
