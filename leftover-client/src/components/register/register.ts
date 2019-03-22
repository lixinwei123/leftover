import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ActionSheetController, ViewController, Events,AlertController} from 'ionic-angular';
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuth} from "@angular/fire/auth";
import { Injectable } from '@angular/core';
import {RestProvider} from "../../providers/rest/rest";
//import { Database } from 'firebase/database';
/**
 * Generated class for the RegisterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
@Injectable()
export class RegisterComponent {

  text = "";
  password = "";
  email = "";
  passwordC = "";
  emailC = "";
  firstname = "";
  lastname = "";
  constructor(public navCtrl: NavController,
   public modalCtrl: ModalController, 
   public viewCtrl: ViewController,
    public events: Events,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private restAPI: RestProvider
    ) {
    console.log('Hello RegisterComponent Component');
    this.text = 'Hello World';
  }


closeModal(){
	this.viewCtrl.dismiss();
	this.events.publish('showLoginCard');
	console.log('clicked on closeModal function');
}

alertError(error) {
  var alert = this.alertCtrl.create(
      {
        title: error
      }
    )
  alert.present();
}
finishRegistration(){
  //var database = Database.database();
  //var ref = database.ref("ID");
  //ref.on('ID', this.getID, this.err);

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (this.password != this.passwordC){
    this.alertError("Passwords do not match.");
  }
  else if (this.email != this.emailC){
    this.alertError("Emails do not match.");
  }
  else if(this.password.length < 7){
    this.alertError("The password should be at least 7 characters long.");
  }
  else if (re.test(String(this.email).toLowerCase()) == false){
    this.alertError("bad email");
  }
  else if (this.firstname == "")
  {
    this.alertError("Please enter your first name.")
  }
    else if (this.lastname == "")
  {
    this.alertError("Please enter your last name.")
  }
  else{
  var result = this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password).then (res =>{
     var usrInfo = {
     uid: res.user.uid,
     email:this.email,
     firstname: this.firstname,
     lastname: this.lastname
   }
       console.log("registered",res.user.uid)
    this.restAPI.postRequest(usrInfo,'createUser').then(( result) =>{
      console.log(result);
    },
    (err) => {
      console.log("error",err);
    },
    );
      this.closeModal()
  },
    fail =>{
      this.alertError("invalid information or this email has already been used")
    }
  );
  }
}
//getID(data){
  //console.log(ID.val());
//  var ID = data.val();
//  var keys = Object.keys(ID);
//  console.log(keys);
//  for (var i = 0; i < keys.length; i++)
//  {
//    var k = keys[i];
//    var email = ID[k].email;
//    console.log(email);
//  }
//}
//err(err){
//  console.log('Error');
//  console.log(err);
//}

//   makeRequest(uid){
//     var httpOptions = {
//     headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//   })
// };


  //  var req = this.http.post("/createUser", JSON.stringify(usrInfo),httpOptions);
  //  //'http://f16190f8.ngrok.io/createUser'
  //  req.subscribe(data => {
  //    console.log("data",data);
  //  })
  // }

}
