import { BACK_END_URL } from './../../const';
import { Rental } from './../models/entities/rental';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { ItemResponseModel } from '../models/responses/item-response-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = BACK_END_URL + '/rentals';
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

  getRental(rentalId: Number): Observable<ItemResponseModel<Rental>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ItemResponseModel<Rental>>(
      this.apiUrl + '/getbyid?rentalId=' + rentalId,
      { headers: this.headers }
    );
  }

  getIdByRentalInfos(
    carId: number,
    customerId: number,
    rentDate: Date,
    returnDate: Date
  ): Observable<ItemResponseModel<Rental>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ItemResponseModel<Rental>>(
      this.apiUrl +
        '/getidbyrentalinfos?carId=' +
        carId +
        '&customerId=' +
        customerId +
        '&rentDate=' +
        rentDate +
        '&returnDate=' +
        returnDate,
      { headers: this.headers }
    );
  }

  addRental(rental: Rental): Observable<Rental> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<Rental>(this.apiUrl + '/add', rental, {
      headers: this.headers,
    });
  }
}
