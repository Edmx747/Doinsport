import { TodoService } from './../../../services/todo.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  public todo: string;
  constructor(private modalController: ModalController, private todoService: TodoService) { }

  ngOnInit() {}
  createTodo(){
    this.todoService.createTodo(this.todo).subscribe(
      (res: any) => {
        this.closeModal();
      }
    );
  }
  closeModal(){
    this.modalController?.dismiss();
  }
}
