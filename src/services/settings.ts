import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserService } from './user';

import { Settings } from './../models/settings';

@Injectable()
export class SettingsService {
  settings: Settings
  settingsChanged = new Subject<Settings>()

  constructor(
    private userService: UserService
  ) { }

  setSettings(settings: any = {}) {
    this.settings = new Settings(
      settings.investmentCurrency,
      settings.valueCurrency
    );
  }

  getSettings() {
    return this.settings;
  }

  updateSettings(newSetting) {
    this.settings.updateSettings(newSetting);
    this.userService.updateSettings(this.settings);
    this.settingsChanged.next(this.settings);
  }
}
