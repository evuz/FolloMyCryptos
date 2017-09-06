import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SignupPage } from './../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToRegister() {
    this.navCtrl.setRoot(SignupPage);
  }

}
