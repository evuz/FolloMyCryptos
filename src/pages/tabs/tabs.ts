import { Component } from '@angular/core';

import { CoinsPage } from './../coins/coins';
import { PortfolioPage } from './../portfolio/portfolio';

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs>
      <ion-tab [root]="portfolioPage" tabTitle="Library" tabIcon="book"></ion-tab>
      <ion-tab [root]="coinsPage" tabTitle="World" tabIcon="globe"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {
  portfolioPage = PortfolioPage;
  coinsPage = CoinsPage;
}
