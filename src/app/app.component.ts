import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';

import { AuthService } from './../services/auth';
import { UserService } from './../services/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authService: AuthService,
    userService: UserService
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyCizpJfAuIZ8Y7QoVx15zvWa5Q7bE6OEAM",
      authDomain: "followmycrypto.firebaseapp.com",
      databaseURL: "https://followmycrypto.firebaseio.com",
      projectId: "followmycrypto",
      storageBucket: "followmycrypto.appspot.com",
      messagingSenderId: "613438993917"
    });

    authService.initListenerAuth();

    userService.userChanged.subscribe((user) => {
      if (!user) {
        this.nav.setRoot(SigninPage);
      }
    });

    Promise.all([userService.isUserInit(), platform.ready()])
      .then(([user]) => {
        if (user) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = SigninPage
        }

        statusBar.styleDefault();
        statusBar.backgroundColorByHexString('#607D8B')
        statusBar.overlaysWebView(false);
        splashScreen.hide();
      })
  }
}

