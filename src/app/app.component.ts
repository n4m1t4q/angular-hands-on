import { Component } from '@angular/core';

import { todoList } from './todoList';

import { Todo } from './todo';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'My todo-list';
  todoList: Todo[] = [...todoList];

  addTodo(title: string) {
    const todo: Todo = {
      title: title,
      completed: false
    };
    this.todoList.unshift(todo);
  }
}
