import { Component,  } from '@angular/core';
import {UserinfoProvider} from "../../providers/userinfo/userinfo";
import {ViewController,Events}  from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
/**
 * Generated class for the ListsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lists',
  templateUrl: 'lists.html'
})
export class ListsComponent {

  text: string;
  shopLists: Array<any>;
  nameLists: any;
  amountLists: any;
  priceLists: any;
  gotResult: any;
  constructor(private usrInfo: UserinfoProvider,
  	private viewCtrl: ViewController,
  	private events: Events,
  	private rest: RestProvider) {
    console.log('Hello ListsComponent Component');
    this.text = 'Hello World';
    this.shopLists = this.usrInfo.getShoppingList();
    console.log(this.shopLists,"yeah")
  }


closeModal(){
this.events.publish('showChoices');
this.viewCtrl.dismiss();
}

getList(item){
	this.nameLists =[];
    this.amountLists = [];
    this.priceLists = [];
	console.log(item)
	this.rest.postRequest(item,"getOneList").then(
		success => {
			console.log(success,"yoooo")
			for(var i in success){
				this.nameLists.push(success[i].item_name);
			}
			for(var i in success){
				this.amountLists.push(success[i].price);
			}
			for(var i in success){
				this.priceLists.push(success[i].quantity);
			}
			console.log(this.nameLists);
			this.gotResult = success;
		}
		)
}
}