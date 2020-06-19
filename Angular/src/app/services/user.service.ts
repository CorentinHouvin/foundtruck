import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // HTTP Methods

  // Register a user
  postUser(user: User) {
    if (user.role == 'consumer')
      return this.http.post(environment.apiBaseUrl + '/registerConsumer', user, this.noAuthHeader);
    else if (user.role == 'foodtruck')
      return this.http.post(environment.apiBaseUrl + '/registerFoodtruck', user, this.noAuthHeader);
  }

  // Login
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  // Get user profile
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  // Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
