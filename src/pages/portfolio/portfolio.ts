import { Operation } from './../../models/operation';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { SettingsPage } from './../settings/settings';
import { NewOperationPage } from './../new-operation/new-operation';

import { AuthService } from './../../services/auth';
import { UserService } from './../../services/user';
import { SettingsService } from './../../services/settings';
import { CoinMarketService } from './../../services/coinMarket';

import { User } from './../../models/user';

@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage implements OnInit {
  moneyValue: string;
  fetching: string;
  pageActive: boolean;
  loading: Loading;
  user: User;
  coinsValue: any[] = [];
  total: { total: number, profit: number };

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private coinMarketService: CoinMarketService,
    private authService: AuthService,
    private userService: UserService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.moneyValue = this.settingsService.getSettings().investmentCurrency;
    this.initSubscribes();
    this.coinMarketService.fetchNames();
    if (this.user) {
      this.getOperationsValue();
    }
  }

  initSubscribes() {
    this.userService.userChanged
      .subscribe((user: User) => {
        if (user) {
          this.user = user;
          this.getOperationsValue();
        }
      });
    this.settingsService.settingsChanged.subscribe((settings) => {
      this.moneyValue = settings.investmentCurrency;
    });
  }

  goToNewOperation() {
    this.navCtrl.push(NewOperationPage);
  }

  private getOperationsValue(cb?) {
    if (this.pageActive && !this.fetching) {
      this.showLoading();
    } else {
      this.fetching = 'fetching';
    }
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
          const total = acum.total + operations[index].amount * coin.price;
          const profit = acum.profit + total - operations[index].investment;
          return {
            total,
            profit
          }
        }, { profit: 0, total: 0 });
        this.coinsValue = coins;
        if (cb) cb();
        if (this.fetching === 'loading') {
          this.loading.dismiss();
        }
        this.fetching = undefined;
      })
  }

  onDeleteOperation(operation: Operation) {
    this.userService.deleteOperation(operation);
  }

  onEditOperation(operation: Operation) {
    this.navCtrl.push(NewOperationPage, { operation });
  }

  onLogOut() {
    this.authService.logOut();
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  doRefresh(refresher) {
    this.getOperationsValue(() => refresher.complete());
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.fetching = 'loading';
    this.loading.present();
  }

  ionViewDidEnter() {
    this.pageActive = true;
    if (this.fetching === 'fetching') {
      this.showLoading();
    }
  }

  ionViewWillLeave() {
    this.pageActive = false;
  }
}
