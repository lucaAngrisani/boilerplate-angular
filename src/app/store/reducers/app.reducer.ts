import { createReducer, on } from '@ngrx/store';
import { removeAppState, updateAppState } from '../actions/app.actions';

const initialState: Object = {};

export const appReducer = createReducer(
  initialState,
  on(updateAppState, (prevState, newState) => newState),
  on(removeAppState, (prevState, newState) => null),
);
