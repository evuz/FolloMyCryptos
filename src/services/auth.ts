import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { UserService } from './../services/user';

@Injectable()
export class AuthService {


  constructor(
    private userService: UserService
  ) { }

  initListenerAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`users/${user.email.replace('.', '_')}`)
          .once('value')
          .then((snapshot) => {
            const user = snapshot.val();
            if(!user.operations) user.operations = [];
            this.userService.setUser(user);
          });
      } else {
        this.userService.setUser(user);
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

  logOut () {
    firebase.auth().signOut();
  }
}
