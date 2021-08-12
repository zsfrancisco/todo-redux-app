import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('inputTodoText') inputTodoText: ElementRef;

  chkCompleted: FormControl;
  txtInput: FormControl;

  isEditingTodo: boolean = false;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);
    this.chkCompleted.valueChanges.subscribe((value) => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }

  editTodo(): void {
    this.isEditingTodo = true;
    this.txtInput.setValue(this.todo.text);
    setTimeout(() => {
      this.inputTodoText.nativeElement.select();
    }, 1);
  }

  finishEdition(): void {
    this.isEditingTodo = false;
    if (this.txtInput.invalid || this.txtInput.value === this.todo.text) {
      return;
    }
    this.store.dispatch(
      actions.edit({ id: this.todo.id, text: this.txtInput.value })
    );
  }

  deleteTodo(): void {
    this.store.dispatch(actions.deleteTodo({ id: this.todo.id }));
  }
}
