import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import * as shortID from 'shortid';
import {RestProvider} from "../rest/rest";
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
shoppingList : any;
  constructor(
  	private afAuth: AngularFireAuth,
    private restAPI: RestProvider) {
    console.log('Hello UserinfoProvider Provider');

  }
  	subData(){
      this.afAuth.authState.subscribe(data => {
        if(data.uid){
          this.setUsrId(data.uid);
          console.log("ok done");
          this.ajaxLists(data.uid)
        }
      else{
        console.log("no one logged in yet");
      }
      });
  	}

   ajaxLists(usrid){
     var obj = {
       usrid: usrid
     }
     this.restAPI.postRequest(obj,"getLists").then(
       result => {
          this.shoppingList = result;
          console.log(this.shoppingList,"boo")
       }
       )
   }
 
  setUsrId(uid){
  	this.uid = uid
  }

  getUsrId(){
  	return this.uid;
  }

  getShortUniqueID() {
    return shortID.generate()
  }

  getShoppingList(){
    return this.shoppingList
  }
  
}
