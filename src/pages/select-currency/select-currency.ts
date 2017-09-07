import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { ICurrency } from './../../models/currency';

import { CoinMarketService } from './../../services/coinMarket';

@Component({
  selector: 'page-select-currency',
  templateUrl: './select-currency.html'
})
export class SelectCurrencyPage implements OnInit {
  allItems: ICurrency[];
  items: ICurrency[];

  constructor(
    private viewCtrl: ViewController,
    private coinMarketService: CoinMarketService
  ) { }

  ngOnInit() {
    this.allItems = this.coinMarketService.getCoinNames();
    this.items = this.allItems;
  }

  onSelectItem(item: ICurrency) {
    this.viewCtrl.dismiss(item);
  }

  onSearch(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.allItems.filter((item) => {
        return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.items = this.allItems;
    }
  }
}
