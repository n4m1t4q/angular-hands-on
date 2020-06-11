import { Component, VERSION } from '@angular/core';

import { todoList} from './todoList';

import { Todo } from './todo';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'My todo-list';
  todoList = todoList;

  addTodo(todo: Todo) {
    this.todoList.unshift(todo);
  }
}
