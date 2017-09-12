import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LoadingController, Content } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { CoinMarketService } from './../../services/coinMarket';
import { CoinConvertService } from './../../services/coinConvert';
import { SettingsService } from './../../services/settings';

@Component({
  selector: 'page-coins',
  templateUrl: 'coins.html',
})
export class CoinsPage implements OnInit, OnDestroy {
  @ViewChild(Content) content: Content;
  settingsSubscription: Subscription;
  moneyValue: string;
  items: any[] = [];

  constructor(
    private coinMarketService: CoinMarketService,
    private settingsService: SettingsService,
    private coinConvertService: CoinConvertService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.moneyValue = this.settingsService.getSettings().valueCurrency;
    this.settingsSubscription = this.settingsService.settingsChanged
      .subscribe(async (settings) => {
        if (this.moneyValue != settings.valueCurrency) {
          this.moneyValue = settings.valueCurrency;
          const conversion = await this.coinConvertService.getConversion();

          this.items = this.items.map((el) => {
            const price = this.moneyValue === 'usd' ?
              el.price / conversion : el.price * conversion;
            return Object.assign({}, el, { price });
          });
        }
      })
    this.getCoins();
  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
  }

  onRefresh() {
    this.getCoins();
    this.content.scrollToTop();
  }

  doRefresh(refresher) {
    this.getCoins(() => refresher.complete());
  }

  private async getCoins(cb?: Function) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    const conversion = this.moneyValue !== 'usd' ?
      await this.coinConvertService.getConversion() : undefined;

    this.coinMarketService.getCoins()
      .map((res) => {
        if (conversion) {
          return res.map((el) => {
            return Object.assign({}, el, { price: el.price * conversion });
          });
        } else return res;
      })
      .subscribe((res) => {
        loading.dismiss();
        this.items = res;
        if (cb) cb();
      });
  }
}
