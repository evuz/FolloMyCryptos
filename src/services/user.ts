import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

import { User } from './../models/user';
import { Operation } from './../models/operation';
import { Settings } from './../models/settings';

@Injectable()
export class UserService {
  private userInitialized = false;
  private user: User;
  userChanged = new Subject();

  setUser(user) {
    if (user) {
      this.user = new User(user);
    } else {
      this.user = undefined;
    }
    this.userInitialized = true;
    this.userChanged.next(this.user);
  }

  getUser() {
    return this.user;
  }

  newOperation(operation: Operation) {
    this.user.addOperation(operation);
    this.updateUser();
  }

  deleteOperation(operation: Operation) {
    this.user.deleteOperation(operation);
    this.updateUser();
  }

  updateOperation(operation: Operation) {
    this.user.updateOperation(operation);
    this.updateUser();
  }

  updateSettings(settings: Settings) {
    firebase.database().ref(`users/${this.user.email.replace('.', '_')}`)
      .set(Object.assign({}, this.user, { settings }));
  }

  isUserInit() {
    return new Promise((res, rej) => {
      if (this.userInitialized) {
        res(this.user);
      } else {
        const subscription = this.userChanged
          .subscribe((user) => {
            subscription.unsubscribe();
            res(user);
          });
      }
    });
  }

  private updateUser() {
    this.userChanged.next(this.user);
    firebase.database().ref(`users/${this.user.email.replace('.', '_')}`)
      .set(this.user);
  }
}
