import { Todo } from './../app/models/todo.interface';
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
    return this.http.post(this.url + Endpoints.TODO, { label });
  }
  readTodo() {
    return this.http.get(this.url + Endpoints.TODOS, {});
  }
  updateTodo(todo: Todo) {
    return this.http.put(this.url + Endpoints.TODO + '/' + todo.id, {
      label: todo.label,
      done: todo.done
    });
  }
  deleteTodo(id: string) {

  }
}
