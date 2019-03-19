import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ActionSheetController, ViewController, Events, AlertController} from 'ionic-angular';
// import {RestProvider} from "../../providers/rest/rest";
import {UserinfoProvider} from "../../providers/userinfo/userinfo";
@Component({
  selector: 'shop-list',
  templateUrl: 'shop-list.html'
})
export class ShopListComponent {

  text: string;
  bookBuy = false;
  bookExchange = true;
  bookName: string;
  bookISBN: any;
  bookPrice: number;
  currentIndex:any; //for getting the current index of the book that the user is editting right now. 
  currentEdit = false; //if currentEdit is false, then addBook function will add a new entry, if it's true, then addbook will modify existing entry.
  //below is hardcoded fake data for testing purpose only
  //neededBooks = [{isbn:1931283412831,name:"Conception of Mind",buy:true,exchange:true, price: 21}];
		// 		{isbn:1838407937423,name:"Calculus Fundamentals 101",buy:true,exchange:false, price: 34},
		// 		{isbn:9534241410034,name:"Art History and Man Kind 221",buy:false,exchange:true}
  //];
  bookArray: any;
  oldISBN: any;
  neededBooks: any;
  constructor(public navCtrl: NavController,
   public modalCtrl: ModalController, 
   public viewCtrl: ViewController,
    public events: Events,
    public alertCtrl: AlertController,
    // private restAPI: RestProvider,
    private usrInfo: UserinfoProvider
  	) {
  	console.log("Hello RegisterComponent Component");
  	this.text = "Hello World";
  	this.getBookArr();
  }

getBookArr(){
	// this.neededBooks = this.usrInfo.getNeededBookArray();
	if(this.neededBooks.length <= 0){
		setTimeout(bad => {this.getBookArr()}, 1000)
	}
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
addBook(){
	if(!this.bookISBN || !this.bookName){
		this.showAlert('you are missing either the ISBN or the name');
	}
	else if(!this.bookExchange && !this.bookBuy){
		this.showAlert('Please select at least one option for handling your book');
	}
	else if(this.bookBuy == true && (this.bookPrice == null || this.bookPrice == 0)){
		this.showAlert('Invalid price, please enter a valid price');
	}
	else if(String(this.bookISBN).length != 13){
		this.showAlert('Invalid ISBN number');
	}
	else{
		var method;
		if (this.bookBuy && this.bookExchange){
			method = 3
		}
		else if (this.bookBuy){
			method = 2
		}
		else{
			method = 1
		}
		var newBookObj = {
			isbn:this.bookISBN,
			name:this.bookName,
			buy:this.bookBuy,
			exchange:this.bookExchange,
			price: this.bookPrice
		}
		console.log("foobar", this.usrInfo.getUsrId());
		if(!this.bookBuy){
			this.bookPrice = 0;
		}
		var apiObj = {
			isbn: this.bookISBN,
			bName: this.bookName,
			method: method,
			price: this.bookPrice,
			uid: this.usrInfo.getUsrId()
		}
		if(this.currentEdit){
			apiObj["oldisbn"] = this.oldISBN;
			console.log("fooo", this.oldISBN);
			this.neededBooks[this.currentIndex] = newBookObj;
			// this.postReq(apiObj,'/editNeededBook')
			this.currentEdit = false;
		}
		else{
			this.neededBooks.push(newBookObj);
			// this.postReq(apiObj,'/postNeedBook')
		}
		this.bookISBN = null;
		this.bookName = "";
		this.bookExchange = true;
		this.bookBuy = false;
		this.bookPrice = null;
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
	let alertCtrl = this.alertCtrl.create({
		title: alertMessage,
		buttons: [
		{
			text: "got it",
			role: "cancel"
		}
		]
	});
	alertCtrl.present();
}

//POP CONFIRMATION OF DELETION
confirmDeletion(bookInfo){
	let alertCtrl = this.alertCtrl.create({
		title: "are you sure you want to delete this entry?",
		buttons: [
		{
			text: "delete",
			role: "ok",
			handler: () => {
				// this.deleteBook(bookInfo)
			}
		},
		{
			text: "cancel",
			role: "cancel",
		}
		]
	});
	alertCtrl.present();
}

// postReq(obj, url){
// 	this.restAPI.postRequest(obj,url).then((result) => {
// 		console.log(result);
// 	},
// 	(err) => {
// 		console.log("error,err")
// 	}
// 	)
// }

editBook(bookInfo){
	this.currentEdit = true;
	this.bookBuy = bookInfo.buy;
	this.bookExchange = bookInfo.exchange;
	this.bookISBN = bookInfo.isbn;
	this.bookPrice = bookInfo.price;
	this.bookName = bookInfo.name;
	for(var i in this.neededBooks){
		if(this.neededBooks[i].isbn == bookInfo.isbn){
			this.oldISBN = this.neededBooks[i].isbn;
			this.currentIndex = parseInt(i);
	}
	}
}
}


