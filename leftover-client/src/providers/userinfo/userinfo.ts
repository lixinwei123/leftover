import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
/*
  Generated class for the UserinfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserinfoProvider {
uid : any;
bookArray : any;
neededBookArray : any;
  constructor(
  	private afAuth: AngularFireAuth) {
    console.log('Hello UserinfoProvider Provider');

  }
  	subData(){
  	this.afAuth.authState.subscribe(data => {
      if(data.uid){
      	this.setUsrId(data.uid);
        console.log("ok done");
      }
     else{
       console.log("no one logged in yet");
     }
    });
  	}

 
  setUsrId(uid){
  	this.uid = uid
  }

  getUsrId(){
  	return this.uid;
  }

}
