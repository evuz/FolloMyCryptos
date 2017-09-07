import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { User } from './../models/user';
import { Operation } from './../models/operation';

@Injectable()
export class UserService {
  private userInitialized = false;
  private user: User;
  userChanged = new Subject();

  setUser(user) {
    if(user) {
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
}
