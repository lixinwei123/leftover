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


  constructor(public navCtrl: NavController,
   public modalCtrl: ModalController, 
   public viewCtrl: ViewController,
    public events: Events,
    public alertCtrl: AlertController,
    private restAPI: RestProvider,
    private usrInfo: UserinfoProvider
  	) {
  	// this.getBookArr();
  }


getItemsArr(){
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

//ADD ENTRY OR MODIFY CURRENT ENTRY BASED ON THE BOOLEAN VARIABLE 
addItem(){
	console.log('item', this.newItem)

	//*TODO Kevin: Add this.newItem to the backend here
	
	
	//END of backend work, time to reset this.newItem
	this.newItem = {
		name: "",
		amount: null,
		price: null,
	}
}

// deleteBook(bookInfo){
// 	console.log("bookInfo",bookInfo);

// 	for(var i in this.neededBooks){
// 		if(this.neededBooks[i].isbn == bookInfo.isbn){
// 			this.neededBooks.splice(parseInt(i),1);
// 			var obj = {
// 				isbn: bookInfo.isbn,
// 				uid: this.usrInfo.getUsrId()
// 			}
// 			this.postReq(obj,'/deleteNeededBook')
// 		}
// 	}
// }

showAlert(alertMessage){
	// let alertCtrl = this.alertCtrl.create({
	// 	title: alertMessage,
	// 	buttons: [
	// 	{
	// 		text: "got it",
	// 		role: "cancel"
	// 	}
	// 	]
	// });
	// alertCtrl.present();
}

//POP CONFIRMATION OF DELETION
confirmDeletion(bookInfo){
	// let alertCtrl = this.alertCtrl.create({
	// 	title: "are you sure you want to delete this entry?",
	// 	buttons: [
	// 	{
	// 		text: "delete",
	// 		role: "ok",
	// 		handler: () => {
	// 			// this.deleteBook(bookInfo)
	// 		}
	// 	},
	// 	{
	// 		text: "cancel",
	// 		role: "cancel",
	// 	}
	// 	]
	// });
	// alertCtrl.present();
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


