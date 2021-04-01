import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SharedCustomerModule } from './customer/shared-customer/shared-customer.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { BnNgIdleService } from 'bn-ng-idle';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';
import { environment } from 'src/environments/environment';
import { JwtInterceptor, ErrorInterceptor } from './helper';
import { SortablejsModule } from 'ngx-sortablejs';
import { GlobalErrorHandler } from './helper/error-handler';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { reducer } from './reducers/user.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppState } from './app.state';
import { MomentModule } from 'ngx-moment';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: environment.baseapi // it is recommended to set your domain, for cookies to work properly
  },
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff',
      link: '#ffffff',
    },
    button: {
      background: '#f9ae05',
      text: '#000000',
      border: '#f9ae05',
    }
  },
  theme: 'classic',
  type: 'opt-out'
};

const reducers: ActionReducerMap<AppState> = {user:reducer};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['user'],rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SharedCustomerModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    MomentModule,
    SortablejsModule.forRoot({ animation: 150 }),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8Aphh9TfxhOqU6-RzeMWt0l8oIzVa8MU'
    }),
    StoreModule.forRoot(      
      reducers,
      {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({stateKey:'router'}),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
      BnNgIdleService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
