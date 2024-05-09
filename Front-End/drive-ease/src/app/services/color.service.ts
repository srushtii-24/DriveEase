import { BACK_END_URL } from './../../const';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { Color } from 'src/app/models/entities/color';
import { ResponseModel } from '../models/responses/response-model';
import { ItemResponseModel } from '../models/responses/item-response-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = BACK_END_URL + '/colors';
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

  getColors(): Observable<ListResponseModel<Color>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ListResponseModel<Color>>(
      this.apiUrl + '/getall',
      { headers: this.headers }
    );
  }

  getColorById(colorId: number): Observable<ItemResponseModel<Color>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ItemResponseModel<Color>>(
      this.apiUrl + '/getbyid?colorId=' + colorId,
      { headers: this.headers }
    );
  }

  addColor(color: Color): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/add', color, {
      headers: this.headers,
    });
  }

  deleteColor(color: Color): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/delete', color, {
      headers: this.headers,
    });
  }

  updateColor(color: Color): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/update', color, {
      headers: this.headers,
    });
  }
}
