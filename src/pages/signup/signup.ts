import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SigninPage } from './../signin/signin';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToLogin() {
    this.navCtrl.setRoot(SigninPage);
  }

}
