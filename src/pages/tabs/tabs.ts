import { Component } from '@angular/core';

import { CoinsPage } from './../coins/coins';
import { LibraryPage } from './../library/library';

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs>
      <ion-tab [root]="libraryPage" tabTitle="Library" tabIcon="book"></ion-tab>
      <ion-tab [root]="coinsPage" tabTitle="World" tabIcon="globe"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {
  libraryPage = LibraryPage;
  coinsPage = CoinsPage;
}
