import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeAppState, updateAppState } from './store/actions/app.actions';
import { selectAppState, selectAppStateWrapped } from './store/selectors/app.selectors';
import { StoreModel } from './store/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    JsonPipe,
    AsyncPipe,
    RouterOutlet,
  ]
})
export class AppComponent {

  appState$: Observable<Object>;
  appStateWrapped$: Observable<Object>;

  constructor(
    private store: Store<StoreModel>
  ) {
    this.appState$ = store.select(selectAppState);
    this.appStateWrapped$ = store.select(selectAppStateWrapped);
  }

  updateAppState() {
    this.store.dispatch(updateAppState({ newState: true, date: new Date() }));
  }

  removeAppState() {
    this.store.dispatch(removeAppState());
  }
}
