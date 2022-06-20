import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const BASE_URL = 'https://test.kmedini.fr/';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(BASE_URL + 'auth/signin', { username, password });
  }
}
