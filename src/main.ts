import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/* eslint-disable @typescript-eslint/dot-notation */
window['CESIUM_BASE_URL'] = '/assets/cesium/';
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
