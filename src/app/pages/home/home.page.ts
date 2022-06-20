import { Todo, TodoResponse } from './../../models/todo.interface';
import { TodoService } from '../../../services/todo.service';
import { CreateTodoComponent } from '../../components/create-todo/create-todo.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public todos: Todo[];
  constructor(private modalController: ModalController, private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(){
    this.todoService.readTodo().subscribe(
      (res: TodoResponse) => {
        console.log(res);
        this.todos = res.rows;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  async createTodo(){
    const modal = this.modalController.create({
      component: CreateTodoComponent,
      cssClass: 'create-todo-modal',
      backdropDismiss: false,
    });
    (await modal).present();
    (await modal).onDidDismiss().then(() => {
      this.getTodos();
    });
  }
}
