import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as filterActions from '../../filter/filter.actions';
import * as todoActions from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit {
  currentFilter: filterActions.validFilters = 'all';
  filters: filterActions.validFilters[] = ['all', 'completed', 'pending'];
  pending = 0;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.currentFilter = state.filter;
      this.pending = state.todos.filter((todo) => !todo.completed).length;
    });
    // this.filter$ = this.store.select('filter');
  }

  onChangeFilter(filter: filterActions.validFilters): void {
    this.store.dispatch(filterActions.setFilter({ filter }));
  }

  onClearCompleted(): void {
    this.store.dispatch(todoActions.clearCompleted());
  }
}
