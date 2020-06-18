import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string;

  @Output() add = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  create() {
    this.add.emit(this.title);
    this.title = '';
  }
}