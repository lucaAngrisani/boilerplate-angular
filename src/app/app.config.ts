import { provideHttpClient } from '@angular/common/http';
import {
  inject,
  isDevMode,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { appRoutes } from './router/app.routes';
import { SessionStore } from './stores/session.store';
import { initApp } from './functions/init.function';

export const appConfig = {
  providers: [
    provideZonelessChangeDetection(),

    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withPreloading(isDevMode() ? NoPreloading : PreloadAllModules)
    ),

    /** CONSIDER TO USE HttpClientModule FOR HttpRequest */
    provideHttpClient(),

    /** CONSIDER TO USE ngx-translate FOR i18n */
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      defaultLanguage: 'en',
      loader: provideTranslateHttpLoader({
        prefix: 'assets/i18n/',
        suffix: '.json',
      }),
    }),

    /** CONSIDER TO USE NgRx (signal based) */
    provideAppInitializer(() => {
      const session = inject(SessionStore);
      session.hydrate();
      initApp();
    }),
  ],
};
