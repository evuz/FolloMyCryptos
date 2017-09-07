import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

import { User } from './../models/user';

@Injectable()
export class AuthService {
  private userInitialized = false;
  private user: User;
  userChanged = new Subject();

  initListenerAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      this.userInitialized = true;
      if (user) {
        firebase.database().ref(`users/${user.email.replace('.', '_')}`)
          .once('value')
          .then((snapshot) => {
            const user = snapshot.val();
            if(!user.operations) user.operations = [];
            this.user = new User(user);
            this.userChanged.next(this.user);
          });
      } else {
        this.userChanged.next(this.user);
      }
    });
  }

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.database().ref(`users/${user.email.replace('.', '_')}`).set({
          email,
          operations: []
        });
        return user;
      });
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

  getUser() {
    return this.user;
  }
}
