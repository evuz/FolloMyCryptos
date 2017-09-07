import { ICurrency } from './../../models/currency';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, NavController } from 'ionic-angular';

import { SelectCurrencyPage } from './../select-currency/select-currency';

import { UserService } from './../../services/user';

import { Operation } from './../../models/operation';

@Component({
  selector: 'page-new-operation',
  templateUrl: './new-operation.html'
})
export class NewOperationPage implements OnInit {
  currency: ICurrency;
  operationForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.operationForm = new FormGroup({
      'currency': new FormControl({ value: '', disabled: true }),
      'amount': new FormControl(null, Validators.required),
      'investment': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.operationForm.valid && this.currency) {
      const { amount, investment } = this.operationForm.value;
      const operation = new Operation(this.currency, amount, investment);
      this.userService.newOperation(operation);
      this.navCtrl.pop();
    }
  }

  onCurrencyInput() {
    const modal = this.modalCtrl.create(SelectCurrencyPage);
    modal.present();
    modal.onDidDismiss((currency: ICurrency) => {
      this.currency = currency;
      this.operationForm.patchValue({
        currency: currency.name
      });
    });
  }
}
