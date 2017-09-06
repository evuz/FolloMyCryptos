import { Component } from '@angular/core';

import { WorldPage } from './../world/world';
import { LibraryPage } from './../library/library';

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs>
      <ion-tab [root]="libraryPage" tabTitle="Library" tabIcon="book"></ion-tab>
      <ion-tab [root]="worldPage" tabTitle="World" tabIcon="globe"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {
  libraryPage = LibraryPage;
  worldPage = WorldPage;
}
