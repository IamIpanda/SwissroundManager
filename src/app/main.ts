import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import { Test } from './data/test'
Test.Test();

platformBrowserDynamic().bootstrapModule(AppModule);
