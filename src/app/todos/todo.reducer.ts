import { createReducer, on } from '@ngrx/store';
import {
  create,
  toggle,
  edit,
  deleteTodo,
  toggleAll,
  clearCompleted,
} from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Tobar escudo del capitán América'),
];

const _todoReducer = createReducer(
  initialState,
  on(create, (state, { text }) => [...state, new Todo(text)]),
  on(deleteTodo, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(toggleAll, (state, { completed }) =>
    state.map((todo) => {
      return { ...todo, completed: completed };
    })
  ),
  on(toggle, (state, { id }) =>
    state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else return todo;
    })
  ),
  on(edit, (state, { id, text }) =>
    state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      } else return todo;
    })
  ),
  on(clearCompleted, (state) => state.filter((todo) => !todo.completed))
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
