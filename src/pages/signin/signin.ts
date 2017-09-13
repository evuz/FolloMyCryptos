import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from 'ionic-angular';

import { TabsPage } from './../tabs/tabs';
import { SignupPage } from './../signup/signup';

import { AuthService } from './../../services/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  useFingerprint: boolean;
  signinForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    const fingerprint = localStorage.getItem('useFingerPrint') === 'true';
    const userRemembered = JSON.parse(localStorage.getItem('userRemember'));
    this.signinForm = new FormGroup({
      'email': new FormControl(
        userRemembered ? userRemembered.email : null,
        Validators.required),
      'password': new FormControl(
        userRemembered && !fingerprint ? userRemembered.password : null,
        Validators.required
      ),
      'remember': new FormControl(userRemembered ? true : false)
    });
  }

  goToRegister() {
    this.navCtrl.setRoot(SignupPage);
  }

  signinFingerprint() {
    const { email, password } = JSON.parse(localStorage.getItem('userRemember'));
    this.signinUser(email, password);
  }

  onChangeUseFingerprint(useFp: boolean) {
    if(this.useFingerprint !== undefined) {
      this.signinForm.patchValue({
        'email': null,
        'password': null,
        'remember': null
      });
      localStorage.removeItem('userRemember');
    }
    this.useFingerprint = useFp;
  }

  signinUser(email: string, password: string) {
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

  longPress() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 1000
    });
    loading.present();
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const { email, password, remember } = this.signinForm.value;
      if (remember || this.useFingerprint) {
        localStorage.setItem(
          'userRemember',
          JSON.stringify({ email, password })
        );
      } else {
        localStorage.removeItem('userRemember');
      }
      this.signinUser(email, password);
    }
  }
}
