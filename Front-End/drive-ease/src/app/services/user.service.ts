import { BACK_END_URL } from './../../const';
import { UserInfos } from './../models/entities/user-infos';
import { Injectable } from '@angular/core';
import { ItemResponseModel } from '../models/responses/item-response-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseModel } from '../models/responses/response-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = BACK_END_URL + '/users';
  token;
  headers;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.get('token');
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Example authorization header
    });
  }

  getUserByEmail(email: string): Observable<ItemResponseModel<UserInfos>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ItemResponseModel<UserInfos>>(
      this.apiUrl + '/getbyemail?email=' + email,
      { headers: this.headers }
    );
  }

  updateUserInfos(user: UserInfos): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + '/updateinfos',
      user,
      {
        headers: this.headers,
      }
    );
  }
}
