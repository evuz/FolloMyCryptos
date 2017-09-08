import { ICurrency } from './../../models/currency';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { SelectCurrencyPage } from './../select-currency/select-currency';

import { UserService } from './../../services/user';

import { Operation } from './../../models/operation';

@Component({
  selector: 'page-new-operation',
  templateUrl: './new-operation.html'
})
export class NewOperationPage implements OnInit {
  editMode: boolean;
  currency: ICurrency;
  operationForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private userService: UserService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    const operation = this.navParams.get('operation');
    this.editMode = operation ? true : false;
    if(this.editMode) {
      this.currency = operation.currency;
    }
    this.operationForm = new FormGroup({
      'currency': new FormControl({
        value: this.editMode ? operation.currency.name : null,
        disabled: true
      }),
      'amount': new FormControl(
        this.editMode ? operation.amount : null,
        Validators.required
      ),
      'investment': new FormControl(
        this.editMode ? operation.investment : null,
        Validators.required
      )
    });
  }

  onSubmit() {
    if (this.operationForm.valid && this.currency) {
      const { amount, investment } = this.operationForm.value;
      const operation = new Operation(this.currency, amount, investment);
      if(this.editMode) {
        this.userService.updateOperation(operation);
      } else {
        this.userService.newOperation(operation);
      }
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
