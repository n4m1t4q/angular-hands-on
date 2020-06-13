import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string;

  @Output() submit = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  create() {
    this.submit.emit(this.title);
    this.title = '';
  }

}