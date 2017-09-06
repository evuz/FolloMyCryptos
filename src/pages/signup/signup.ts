import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { SigninPage } from './../signin/signin';

import { AuthService } from './../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl('')
    });
  }

  goToLogin() {
    this.navCtrl.setRoot(SigninPage);
  }

  onSubmit() {
    const { email, password } = this.signupForm.value;
    this.authService.signupUser(email, password)
    .then(() => console.log('Success'))
    .catch((err) => console.log(err));
  }

}
