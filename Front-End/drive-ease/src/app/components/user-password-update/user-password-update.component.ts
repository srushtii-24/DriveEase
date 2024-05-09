import { UserInfos } from './../../models/entities/user-infos';
import { UserService } from './../../services/user.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserPasswordChangingModel } from 'src/app/models/entities/user-password-changing';

@Component({
  selector: 'app-user-password-update',
  templateUrl: './user-password-update.component.html',
  providers: [MessageService],
  styleUrls: ['./user-password-update.component.css']
})
export class UserPasswordUpdateComponent implements OnInit {

  user:UserInfos;
  userPasswordChangingModel:UserPasswordChangingModel;
  userPasswordUpdateForm:FormGroup;

  constructor(private authService:AuthService,
              private userService:UserService,
              private messageService:MessageService,
              private localStorage:LocalStorageService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
    this.getUserByEmail(email == undefined
                        ? email = ""
                        : email.toString());
    this.createUserPasswordUpdateForm();
  }

  getUserByEmail(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user = response.data;
    })
  }

  createUserPasswordUpdateForm(){
    this.userPasswordUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      currentPassword:["",Validators.required],
      newPassword:["",Validators.required],
    })
  }

  updateUserPassword(){
    this.userPasswordUpdateForm.patchValue({ id: this.user.id })
    if(this.userPasswordUpdateForm.valid){
      let userPasswordModel = Object.assign({},this.userPasswordUpdateForm.value);
      this.authService.updateUserPassword(userPasswordModel).subscribe(
        response => {
    this.messageService.add({severity:'success', summary: 'Success', detail: response.message});

        setTimeout(() => { window.location.reload(); }, 1000);
        },
        responseError => {
      this.messageService.add({severity:'error', summary: 'Error', detail: responseError.error.message});

      })
    }
    else {
      this.messageService.add({severity:'error', summary: 'Error', detail: "The form is missing."});
    }
  }

}
