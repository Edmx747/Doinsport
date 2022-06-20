import { Todo, TodoResponse } from './../../models/todo.interface';
import { TodoService } from '../../../services/todo.service';
import { CreateTodoComponent } from '../../components/create-todo/create-todo.component';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
moment.locale('fr');
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public todos: Todo[];
  public todosByMonth = {};
  public objectKeys = Object.keys;
  constructor(private modalController: ModalController, private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.readTodo().subscribe(
      (res: TodoResponse) => {
        console.log(res);
        this.todos = res.rows;
        this.sortByMonth();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  async createTodo() {
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

  sortByMonth() {
    this.todos.forEach(todo => {
      const month = moment(todo.createdAt).format('MMMM');
      const year = moment(todo.createdAt).format('YYYY');
      if (!this.todosByMonth[`${year}`]) {
        this.todosByMonth[year] = {};
      }
      if (!this.todosByMonth[`${year}`][`${month}`]) {
        this.todosByMonth[`${year}`][`${month}`] = [];
      }
      this.todosByMonth[`${year}`][`${month}`].push(todo);
      const years = (this.objectKeys(this.todosByMonth));
    });
  }
  onCheckboxChange(event: any, todo: Todo) {
    todo.done = event.detail.checked;
    this.todoService.updateTodo(todo).toPromise()
      .then(() => {
        // this.getTodos();
      }
      );
  }
}
