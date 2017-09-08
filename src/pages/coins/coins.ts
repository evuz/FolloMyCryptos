import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, Content } from 'ionic-angular';

import { CoinMarketService } from './../../services/coinMarket';

@Component({
  selector: 'page-coins',
  templateUrl: 'coins.html',
})
export class CoinsPage implements OnInit {
  @ViewChild(Content) content: Content;
  items: any[] = [];

  constructor(
    private coinMarketService: CoinMarketService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getCoins();
  }

  onRefresh() {
    this.getCoins();
    this.content.scrollToTop();
  }

  doRefresh(refresher) {
    this.getCoins(() => refresher.complete());
  }

  private getCoins(cb?: Function) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.coinMarketService.getCoins()
      .subscribe((res) => {
        loading.dismiss();
        this.items = res;
        if(cb) cb();
      });
  }
}
