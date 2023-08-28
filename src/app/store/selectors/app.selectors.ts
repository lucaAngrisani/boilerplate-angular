import { createSelector } from "@ngrx/store";
import { StoreModel } from "../store.model";

export const selectAppState = (state: StoreModel) => state.appState;
export const selectAppStateWrapped = createSelector(
  selectAppState,
  (state: Object) => ({
    wrap: state
  })
);
