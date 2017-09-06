import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

import { User } from './../models/user';

@Injectable()
export class AuthService {
  userInitialized = false;
  userChanged = new Subject();
  user: User;

  initListenerAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      this.userInitialized = true;
      if (user) {
        this.user = new User(user.email);
      }
      this.userChanged.next(this.user);
    });
  }

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then();
  }

  signinUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
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
