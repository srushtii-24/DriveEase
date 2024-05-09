import { BACK_END_URL } from './../../const';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/list-response-model';
import { Customer } from 'src/app/models/entities/customer';
import { CustomerUser } from '../models/entities/customer-user';
import { ItemResponseModel } from '../models/responses/item-response-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = BACK_END_URL + '/customers';
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

  getCustomers(): Observable<ListResponseModel<Customer>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ListResponseModel<Customer>>(
      this.apiUrl + '/getall',
      { headers: this.headers }
    );
  }

  getCustomersByEmail(
    email: string
  ): Observable<ItemResponseModel<CustomerUser>> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.get('token')}`, // Example authorization header
    });
    return this.httpClient.get<ItemResponseModel<CustomerUser>>(
      this.apiUrl + '/getbyemail?email=' + email,
      { headers: this.headers }
    );
  }
}
