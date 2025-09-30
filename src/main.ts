import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeEs, 'es');

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
});
