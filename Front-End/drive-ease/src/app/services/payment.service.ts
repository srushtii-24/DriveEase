import { BACK_END_URL } from './../../const';
import { Payment } from './../models/entities/payment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  token;
  headers;
  apiUrl = BACK_END_URL + '/payments';

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.get('token');
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Example authorization header
    });
  }

  addPayment(payment: Payment): Observable<Payment> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.post<Payment>(this.apiUrl + '/add', payment, {
      headers: this.headers,
    });
  }
}
