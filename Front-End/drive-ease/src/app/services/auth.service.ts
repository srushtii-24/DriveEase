import { BACK_END_URL } from './../../const';
import { UserPasswordChangingModel } from './../models/entities/user-password-changing';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/entities/login-model';
import { SingleResponseModel } from '../models/responses/single-response-model';
import { TokenModel } from '../models/entities/token-model';
import { RegisterModel } from '../models/entities/register-model';
import { ResponseModel } from '../models/responses/response-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44397/api/auth/';
  token;
  headers: any;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.get('token');
  }

  register(registerModel: RegisterModel) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      BACK_END_URL + '/auth/register',
      registerModel
    );
  }

  login(loginModel: LoginModel) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      BACK_END_URL + '/auth/login',
      loginModel
    );
  }

  logout() {
    this.localStorage.remove('token');
    this.localStorage.clear();
    return true;
  }

  isAuthenticated() {
    if (this.localStorage.get('token')) {
      return true;
    } else {
      return false;
    }
  }

  updateUserPassword(userPasswordChangingModel: UserPasswordChangingModel) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(
      BACK_END_URL + '/auth/changepassword',
      userPasswordChangingModel,
      { headers: this.headers }
    );
  }
}
