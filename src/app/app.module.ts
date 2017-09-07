import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { CoinsPage } from './../pages/coins/coins';
import { PortfolioPage } from './../pages/portfolio/portfolio';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';
import { NewOperationPage } from './../pages/new-operation/new-operation';
import { SelectCurrencyPage } from './../pages/select-currency/select-currency';

import { AuthService } from './../services/auth';
import { CoinMarketService } from './../services/coinMarket';
import { UserService } from './../services/user';

@NgModule({
  declarations: [
    MyApp,
    CoinsPage,
    PortfolioPage,
    SigninPage,
    SignupPage,
    TabsPage,
    NewOperationPage,
    SelectCurrencyPage
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
    CoinsPage,
    PortfolioPage,
    SigninPage,
    SignupPage,
    TabsPage,
    NewOperationPage,
    SelectCurrencyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserService,
    CoinMarketService
  ]
})
export class AppModule {}
