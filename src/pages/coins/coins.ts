import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, Content } from 'ionic-angular';

import { CoinMarketService } from './../../services/coinMarket';

@Component({
  selector: 'page-coins',
  templateUrl: 'coins.html',
})
export class CoinsPage implements OnInit {
  @ViewChild(Content) content: Content;
  private delta = 20;
  items: any[];
  nextItems: any[];

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

  doInfinite(infiniteScroll) {
    this.items = this.items.concat(this.nextItems.splice(0, this.delta));
    infiniteScroll.complete();
  }

  private getCoins() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.coinMarketService.getCoins()
      .subscribe((res) => {
        loading.dismiss();
        this.nextItems = res;
        this.items = this.nextItems.splice(0, 20);
      });
  }
}
