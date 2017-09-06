import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { SigninPage } from './../signin/signin';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }

  goToLogin() {
    this.navCtrl.setRoot(SigninPage);
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

}
