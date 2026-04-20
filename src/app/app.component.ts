import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationStore } from './stores/application.store';
import { LANG } from './enums/lang.enum';
import { THEME } from './enums/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [JsonPipe, RouterOutlet],
})
export class AppComponent {
  protected readonly store = inject(ApplicationStore);

  protected switchLang() {
    this.store.setLang(
      this.store.langSelected() === LANG.EN ? LANG.IT : LANG.EN
    );
  }

  protected switchTheme() {
    this.store.setTheme(
      this.store.themeSelected() === THEME.DARK ? THEME.LIGHT : THEME.DARK
    );
  }

  protected resetState() {
    this.store.resetPrefs();
  }
}
