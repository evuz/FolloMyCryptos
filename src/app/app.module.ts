import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { CoinsPage } from './../pages/coins/coins';
import { LibraryPage } from './../pages/library/library';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';

import { AuthService } from './../services/auth';
import { CoinMarketService } from './../services/coinMarket';

@NgModule({
  declarations: [
    MyApp,
    LibraryPage,
    CoinsPage,
    SigninPage,
    SignupPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LibraryPage,
    CoinsPage,
    SigninPage,
    SignupPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CoinMarketService
  ]
})
export class AppModule {}
