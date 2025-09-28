import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

bootstrapApplication(AppComponent).catch((err) => console.error(err));
