import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { SettingsPage } from './../settings/settings';
import { NewOperationPage } from './../new-operation/new-operation';

import { AuthService } from './../../services/auth';
import { UserService } from './../../services/user';
import { SettingsService } from './../../services/settings';
import { CoinMarketService } from './../../services/coinMarket';
import { CoinConvertService } from './../../services/coinConvert';

import { User } from './../../models/user';
import { Operation } from './../../models/operation';

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
    private coinConvertService: CoinConvertService,
    private authService: AuthService,
    private userService: UserService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    const settings = this.settingsService.getSettings();
    this.moneyValue = settings ? settings.investmentCurrency : undefined;
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
          if(!this.moneyValue) this.moneyValue = this.settingsService.getSettings().investmentCurrency;
          this.user = user;
          this.getOperationsValue();
        }
      });
    this.settingsService.settingsChanged
      .subscribe(async (settings) => {
        if (this.moneyValue !== settings.investmentCurrency) {
          this.moneyValue = settings.investmentCurrency;
          const conversion = await this.coinConvertService.getConversion();

          this.total = {
            total: this.moneyValue === 'usd' ?
              this.total.total / conversion : this.total.total * conversion,
            profit: this.moneyValue === 'usd' ?
              this.total.profit / conversion : this.total.profit * conversion
          }
          this.coinsValue = this.coinsValue.map((coin) => {
            return Object.assign({}, coin, {
              price: this.moneyValue === 'usd' ?
                coin.price / conversion : coin.price * conversion
            });
          })
        }
      });
  }

  goToNewOperation() {
    this.navCtrl.push(NewOperationPage);
  }

  private async getOperationsValue(cb?) {
    if (this.pageActive && !this.fetching) {
      this.showLoading();
    } else {
      this.fetching = 'fetching';
    }
    const { operations } = this.user;
    const conversion = this.moneyValue !== 'usd' ?
      await this.coinConvertService.getConversion() : 1;
    const request = operations.map((operation) => {
      return new Promise((resolve, reject) => {
        this.coinMarketService.getCoinById(operation.currency.id)
          .subscribe((res) => {
            resolve(Object.assign({}, res, { price: res.price * conversion }));
          });
      });
    });

    Promise.all(request)
      .then((coins: any[]) => {
        this.total = coins.reduce((acum, coin, index) => {
          const total = acum.total + operations[index].amount * coin.price;
          const profit =
            acum.profit + operations[index].amount * coin.price -
            operations[index].investment * conversion;

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
