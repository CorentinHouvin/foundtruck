import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodtruckService {

  constructor(private http: HttpClient) { }

  // Get the profil of a foodtruck
  getFoodtruckProfile() {
    return this.http.get(environment.apiBaseUrl + '/foodtruckProfile');
  }

  // Toggle Open/Close foodtruck
  toggleFoodtruckOpen(foodtruck) {
    return this.http.patch(environment.apiBaseUrl + '/toggleFoodtruckOpen', foodtruck);
  }

  // Get all foodtrucks
  getFoodtrucks() {
    return this.http.get(environment.apiBaseUrl + '/allFoodtrucks');
  }

  // Get foodtruck detail
  getFoodtruckDetail(_id) {
    let params = {
      _id: _id
    }
    return this.http.get(environment.apiBaseUrl + '/foodtruckDetail', { params });
  }
}
