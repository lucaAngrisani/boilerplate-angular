import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { PreloadAllModules, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment.prod';
import { appRoutes } from './app.routes';
import { HttpInterceptorService } from "./services/http-interceptor.service";
import { InitService } from "./services/init.service";
import { AppEffects } from './store/effects/app.effects';
import { appReducer } from './store/reducers/app.reducer';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: environment.production ? PreloadAllModules : null }),

    /** CONSIDER TO USE HttpClientModule FOR HttpRequest */
    HttpClientModule,

    /** CONSIDER TO USE TranslateModule FOR i18n */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, "assets/i18n/", ".json"),
        deps: [HttpClient],
      },
    }),

    /** CONSIDER TO USE ServiceWorker FOR PWA */
    /*ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),*/

    /** CONSIDER TO USE NgRx */
    StoreModule.forRoot({
      appState: appReducer
    }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (initService: InitService) => () => initService.init(),
      deps: [InitService],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "it-IT"
    },
  ]
})
export class AppModule { }
