import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionStore } from './stores/session.store';
import { LANG } from './enums/lang.enum';
import { THEME } from './enums/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [JsonPipe, RouterOutlet],
})
export class AppComponent {
  public readonly store = inject(SessionStore);

  switchLang() {
    this.store.setLang(
      this.store.langSelected() === LANG.EN ? LANG.IT : LANG.EN
    );
  }

  switchTheme() {
    this.store.setTheme(
      this.store.themeSelected() === THEME.DARK ? THEME.LIGHT : THEME.DARK
    );
  }

  resetState() {
    this.store.resetPrefs();
  }
}
