import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewOperationPage } from './../new-operation/new-operation';

import { UserService } from './../../services/user';
import { CoinMarketService } from './../../services/coinMarket';

import { User } from './../../models/user';

@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage implements OnInit {
  user: User;
  total: { total: number, profit: number };

  constructor(
    private navCtrl: NavController,
    private coinMarketService: CoinMarketService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.userService.userChanged
      .subscribe((user: User) => {
        this.user = user;
        this.getTotalOperations();
      });
    this.coinMarketService.fetchNames();
    this.getTotalOperations();
  }

  goToNewOperation() {
    this.navCtrl.push(NewOperationPage);
  }

  private getTotalOperations() {
    const { operations } = this.user;
    const request = operations.map((operation) => {
      return new Promise((res, rej) => {
        this.coinMarketService.getCoinById(operation.currency.id)
          .subscribe(res)
      });
    });

    Promise.all(request)
      .then((coins: any[]) => {
        this.total = coins.reduce((acum, coin, index) => {
          const total = acum.total + operations[index].amount * coin.priceUSD;
          const profit = acum.profit + total - operations[index].investment;
          return {
            total,
            profit
          }
        }, { profit: 0, total: 0 });
      })
  }
}
