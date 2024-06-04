import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, isDevMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appRoutes } from './app.routes';
import { AppEffects } from './store/effects/app.effects';
import { appReducer } from './store/reducers/app.reducer';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export const appConfig = {
  providers: [
    provideAnimations(),

    provideExperimentalZonelessChangeDetection(),

    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withPreloading(isDevMode() ? NoPreloading : PreloadAllModules)
    ),

    /** CONSIDER TO USE HttpClientModule FOR HttpRequest */
    provideHttpClient(),

    /** CONSIDER TO USE TranslateModule FOR i18n */
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),

    /** CONSIDER TO USE NgRx */
    importProvidersFrom(
      StoreModule.forRoot({
        appState: appReducer
      }),
      EffectsModule.forRoot([AppEffects])
    )
  ]
};
