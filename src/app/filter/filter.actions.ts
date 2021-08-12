import { createAction, props } from '@ngrx/store';

export type validFilters = 'all' | 'completed' | 'pending';

export const setFilter = createAction(
  '[filter] Set Filter',
  props<{ filter: validFilters }>()
);
