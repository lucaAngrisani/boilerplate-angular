import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { APP_STATE } from "src/app/shared/constants";
import { initAppState, removeAppState, updateAppState } from "../actions/app.actions";
import { selectAppState } from "../selectors/app.selectors";
import { StoreModel } from "../store.model";

/**
 * IN THE EFFECTS THERE IS ANYTHING THAT'S NOT DIRECTLY RELATED
 * TO AN IMMEDIATE UI UPDATE (I.E. LOCAL STORAGE OR HTTP REQUEST)
 */
@Injectable()
export class AppEffects {

  saveAppState = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAppState, removeAppState),
      withLatestFrom(this.store.select(selectAppState)),
      tap(([action, data]) => {
        localStorage.setItem(APP_STATE, JSON.stringify(data));
      })
    ),
    { dispatch: false }
  );

  loadState = createEffect(() =>
    this.actions$.pipe(
      ofType(initAppState),
      switchMap(() => {
        const storedState = JSON.parse(localStorage.getItem(APP_STATE));
        console.log(storedState);
        return of(updateAppState(storedState));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<StoreModel>
  ) { }

}
