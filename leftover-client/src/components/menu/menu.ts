import { Component, } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {ToastController, App  } from 'ionic-angular';
// import {LoginPage} from "../../pages/login/login"
/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'menu',
  templateUrl: 'menu.html',
})

export class MenuComponent {
  text: string;

  constructor( private toastCtrl: ToastController, private afAuth: AngularFireAuth, public app: App) {
    console.log('Hello MenuComponent Component');
    this.text = 'Hello World';
  }
    logout(){
    console.log("clicked");
    this.afAuth.auth.signOut().then(success =>{
        this.toastCtrl.create({
        message: "we hope to see you again ... :(",
        duration: 6000
      }).present();
    });
    var nav = this.app.getRootNav();
    nav.setRoot("LoginPage");
  }
}
