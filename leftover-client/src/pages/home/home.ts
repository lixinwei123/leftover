import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    ) {

  }

  login() {
    //Auto direct to CreateGroupPage if user already log in
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user.uid) {
        this.navCtrl.setRoot("CreateGroupPage");
      }
      else {
        this.navCtrl.push("LoginPage");
      }
    })
  }

}
