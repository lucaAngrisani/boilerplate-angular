import { createAction, props } from '@ngrx/store';

export const initAppState = createAction(
  '[App] initAppState'
);

export const updateAppState = createAction(
  '[App] updateAppState',
  props<Object>()
);

export const removeAppState = createAction(
  '[App] removeAppState'
);
