import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { SigninPage } from '../pages/signin/signin';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage = SigninPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyCizpJfAuIZ8Y7QoVx15zvWa5Q7bE6OEAM",
      authDomain: "followmycrypto.firebaseapp.com",
      databaseURL: "https://followmycrypto.firebaseio.com",
      projectId: "followmycrypto",
      storageBucket: "followmycrypto.appspot.com",
      messagingSenderId: "613438993917"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {

  }
}

