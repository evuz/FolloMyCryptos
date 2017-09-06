import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

import { TabsPage } from './../tabs/tabs';
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
    private alertCtrl: AlertController,
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
      .then(() => {
        this.showAlertLogin();
        console.log('Success')
      })
      .catch((err) => console.log(err));
  }

  showAlertLogin() {
    this.alertCtrl.create({
      title: 'Account created!',
      subTitle: 'Your account has been created successfully.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(TabsPage);
          }
        }
      ]
    }).present();
  }
}
