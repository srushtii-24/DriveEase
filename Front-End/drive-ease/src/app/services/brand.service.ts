import { BACK_END_URL } from './../../const';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { Brand } from '../models/entities/brand';
import { ResponseModel } from '../models/responses/response-model';
import { ItemResponseModel } from '../models/responses/item-response-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = BACK_END_URL + '/brands';
  token;
  headers;

  // {headers:this.headers, param: registerModel}

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.get('token');
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Example authorization header
    });
  }

  getBrands(): Observable<ListResponseModel<Brand>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ListResponseModel<Brand>>(
      this.apiUrl + '/getall',
      { headers: this.headers }
    );
  }

  getBrandById(brandId: number): Observable<ItemResponseModel<Brand>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ItemResponseModel<Brand>>(
      this.apiUrl + '/getbyid?brandId=' + brandId,
      { headers: this.headers }
    );
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/add', brand, {
      headers: this.headers,
    });
  }

  deleteBrand(brand: Brand): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/delete', brand, {
      headers: this.headers,
    });
  }

  updateBrand(brand: Brand): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/update', brand, {
      headers: this.headers,
    });
  }
}
