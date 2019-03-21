import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ActionSheetController, ViewController, Events, AlertController} from 'ionic-angular';
import {UserinfoProvider} from "../../providers/userinfo/userinfo";
import { RestProvider } from '../../providers/rest/rest';
import { ShoppingItem } from '../../models/item';
@Component({
  selector: 'shop-list',
  templateUrl: 'shop-list.html'
})
export class ShopListComponent {

 

  question: string;

  newItem: ShoppingItem = {
	  name: "",
	  amount: null,
	  price: null,
  }

  shoppingItems: Array<ShoppingItem> = [] //TODO Kevin: populate this arr


  constructor(public navCtrl: NavController,
   public modalCtrl: ModalController, 
   public viewCtrl: ViewController,
    public events: Events,
    public alertCtrl: AlertController,
    private restAPI: RestProvider,
    private usrInfo: UserinfoProvider
  	) {
  	this.getShoppingItems();
  }


getShoppingItems(){
	// this.neededBooks = this.usrInfo.getNeededBookArray();
	// if(this.neededBooks.length <= 0){
	// 	setTimeout(bad => {this.getBookArr()}, 1000)
	// }
}

ionViewWillLeave(){
this.events.publish('showChoices');
}

closeModal(){
	this.viewCtrl.dismiss();
	this.events.publish('showChoices');
	console.log('clicked on closeModal function');
}

//ADD ENTRY
addItem(){
	console.log('item', this.newItem)

	this.shoppingItems.push(this.newItem)
	this.newItem = {
		name: "",
		amount: null,
		price: null,
	}
}

//DELETE ITEM
deleteItem(index: number){
	this.shoppingItems.splice(index, 1);
}


/*****************API STUFF */
	askQuestion() {
		this.restAPI.postRequest(
			{question: this.question}, "/askQuestion",
		).then(response => {
			console.log('le answer', response)
		})
		.catch(err => {
			console.log('err', err)
		})
	}
}


