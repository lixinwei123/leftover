import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ActionSheetController, Events, ToastController,AlertController} from 'ionic-angular';
import {RegisterComponent} from '../../components/register/register';
import {AngularFireAuth} from "@angular/fire/auth";
import {UserinfoProvider} from "../../providers/userinfo/userinfo";
// import {RegisterPage} from '../pages/register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
displayLogin = true;
password: string;
email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public toast: ToastController,
    public afAuth: AngularFireAuth,
  	public modalCtrl: ModalController,
  	public actionSheet: ActionSheetController,
    public alertCtrl: AlertController,
    private usrInfo: UserinfoProvider) {
  	this.events.subscribe('showLoginCard', () =>{
  		console.log("this got triggered");
  		this.displayLogin = true;
  	});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.afAuth.authState.subscribe(data => {
      if(data.email){
        this.usrInfo.setUsrId(data.uid);
        this.navCtrl.setRoot("CreateGroupPage");
       
      }
     else{
       console.log("no one logged in yet");
     }
    });
    
  }

goToRegister(){
	let regModal = this.modalCtrl.create(RegisterComponent);
	regModal.present();
	this.displayLogin = false;
}

alertError(error) {
  var alert = this.alertCtrl.create(
      {
        title: error
      }
    )
  alert.present();
}
async login(){
  try{
        this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(res =>{
        console.log("Logged in ha",res.user);
      if(res.user.uid){
         this.navCtrl.setRoot("CreateGroupPage");
      }
      },
      fail =>{
        this.alertError("invalid login information, wrong password or email?")
      }
      );
  }
  catch  (e) {
    console.log(e)
    this.alertError("invalid login information, wrong password or email?")
  }
}

}
