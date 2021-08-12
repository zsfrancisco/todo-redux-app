import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { validFilters } from '../../filter/filter.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  currentFilter$: Observable<validFilters>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.todos$ = this.store.select('todos');
    this.currentFilter$ = this.store.select('filter');
  }
}
