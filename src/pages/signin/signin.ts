import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { SignupPage } from './../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl(),
      'remember': new FormControl()
    });
  }

  goToRegister() {
    this.navCtrl.setRoot(SignupPage);
  }

  onSubmit() {
    console.log(this.signinForm.value);
  }
}
