import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PreloadAllModules, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: environment.production ? PreloadAllModules : null }),

    /** CONSIDER TO USE ServiceWorker FOR PWA */
    /*ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
