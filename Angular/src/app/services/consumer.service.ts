import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) { }

  // Get consumer
  getConsumer() {
    return this.http.get(environment.apiBaseUrl + '/consumerProfile');
  }
}
