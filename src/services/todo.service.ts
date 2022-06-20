import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/helpers/endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = environment.url;
  constructor(private http: HttpClient) { }

  createTodo(label: string) {
    return this.http.post(this.url + Endpoints.TODO, {label});
  }
  readTodo() {
    return this.http.get(this.url + Endpoints.TODOS, {});
  }
  updateTodo() {

  }
  deleteTodo(id: string) {

  }
}
