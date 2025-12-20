import { ApplicationConfig, ErrorHandler, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { errorInterceptorInterceptor } from './shared/core/error-interceptor.interceptor';

//para datapicker
import localeEsPe from '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsPe);



export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideClientHydration(),
      provideAnimationsAsync(),
      provideNativeDateAdapter(),
       provideHttpClient(
        withInterceptors([errorInterceptorInterceptor]),
        withFetch()
      ), 
      { provide: LOCALE_ID, useValue: 'es-PE' },
      { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },

     
    ]
};
