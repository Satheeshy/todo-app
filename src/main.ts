import { MainModule } from './main.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/**
* This is the main entry point for the applications. It's only job is to 'Bootstrap' our home module
*/
platformBrowserDynamic().bootstrapModule(MainModule);
