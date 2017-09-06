import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController, LoadingController } from 'ionic-angular';

import { TabsPage } from './../tabs/tabs';
import { SignupPage } from './../signup/signup';

import { AuthService } from './../../services/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl(''),
      'remember': new FormControl(false)
    });
  }

  goToRegister() {
    this.navCtrl.setRoot(SignupPage);
  }

  onSubmit() {
    const { email, password } = this.signinForm.value;
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.signinUser(email, password)
      .then(() => {
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch((err) => {
        loading.dismiss();
        console.log(err)
      });
  }
}
