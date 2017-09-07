import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from './../../services/user';

import { Operation } from './../../models/operation';

@Component({
  selector: 'page-new-operation',
  templateUrl: './new-operation.html'
})
export class NewOperationPage implements OnInit {
  operationForm: FormGroup;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.operationForm = new FormGroup({
      'currency': new FormControl('', Validators.required),
      'amount': new FormControl(null, Validators.required),
      'investment': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if(this.operationForm.valid) {
      const { currency, amount, investment } = this.operationForm.value;
      const operation = new Operation(currency, amount, investment);
      this.userService.newOperation(operation);
    }
  }
}
