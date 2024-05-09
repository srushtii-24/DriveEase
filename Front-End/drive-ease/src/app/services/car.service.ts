import { BACK_END_URL } from './../../const';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { CarDetail } from '../models/entities/car-detail';
import { ResponseModel } from '../models/responses/response-model';
import { Car } from '../models/entities/car';
import { ItemResponseModel } from '../models/responses/item-response-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = BACK_END_URL + '/cars';
  backendUrl = BACK_END_URL;
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

  getCars(): Observable<ListResponseModel<Car>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath, {
      headers: this.headers,
    });
  }

  getCarById(carId: number): Observable<ItemResponseModel<Car>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    let newPath = this.apiUrl + '/getbyid?carId=' + carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath, {
      headers: this.headers,
    });
  }

  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    let newPath = this.apiUrl + '/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath, {
      headers: this.headers,
    });
  }

  getCarsById(carId: number): Observable<ListResponseModel<CarDetail>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    let newPath = this.apiUrl + '/getcardetails?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath, {
      headers: this.headers,
    });
  }

  getCarsByBrand(brandId: Number): Observable<ListResponseModel<CarDetail>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    let newPath = this.apiUrl + '/getcarsbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath, {
      headers: this.headers,
    });
  }

  getCarsByColor(colorId: Number): Observable<ListResponseModel<CarDetail>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    let newPath = this.apiUrl + '/getcarsbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath, {
      headers: this.headers,
    });
  }

  getCarsByFilter(
    brandId: Number,
    colorId: Number
  ): Observable<ListResponseModel<CarDetail>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    let newPath =
      this.apiUrl + `/getcarsbyfilter?brandId=${brandId}&colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath, {
      headers: this.headers,
    });
  }

  addCar(car: Car): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/add', car, {
      headers: this.headers,
    });
  }

  addCarImage(file: File, carId: Number): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    const formData = new FormData();
    formData.append('Image', file, file.name);
    return this.httpClient.post<ResponseModel>(
      this.backendUrl + '/CarImages/add?carId=' + carId,
      formData,
      { headers: this.headers }
    );
  }

  deleteCar(car: Car): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/delete', car, {
      headers: this.headers,
    });
  }

  updateCar(car: Car): Observable<ResponseModel> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/update', car, {
      headers: this.headers,
    });
  }
}
