import { Endpoints } from './../app/helpers/endpoints.enum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isAuthenticated = false;
  private url = environment.url;
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(this.url + Endpoints.AUTHENTICATION, { username, password });
  }
}
