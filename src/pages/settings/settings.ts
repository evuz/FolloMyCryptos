import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { SettingsService } from './../../services/settings';

@Component({
  selector: 'page-settings',
  templateUrl: './settings.html'
})
export class SettingsPage implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const { investmentCurrency, valueCurrency } = this.settingsService.getSettings();

    this.settingsForm = new FormGroup({
      'investmentCurrency': new FormControl(investmentCurrency),
      'valueCurrency': new FormControl(valueCurrency)
    });
  }

  onSave() {
    if (this.settingsForm.dirty) {
      this.settingsService.updateSettings(this.settingsForm.value);
      this.toastCtrl.create({
        message: 'Save!',
        duration: 2000,
        position: 'top'
      }).present();

      this.navCtrl.pop();
    }
  }
}
