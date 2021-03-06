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
  editMode: boolean = false;
  shoppingListID: string = ""
  initialLength: any;
  newItem: ShoppingItem = {
	  item_name: "",
	  quantity: null,
	  price: null,
  }

  shoppingItems: Array<ShoppingItem> = [] //TODO Kevin: populate this arr


  answer:any;
  constructor(public navCtrl: NavController,
	public navParams: NavParams,
	public modalCtrl: ModalController, 
	public viewCtrl: ViewController,
    public events: Events,
    public alertCtrl: AlertController,
    private restAPI: RestProvider,
    private usrInfo: UserinfoProvider
  	) {	
		let id = this.navParams.get('id')
		if (id) {
			//EDIT MODE IS TRUE, we gotta get the shopping list
			this.editMode = true
			this.shoppingListID = id
			this.getShoppingItems(id)
		}
		else {
			//EDIT MODE IS FALSE, we gotta generate a new ID
			this.editMode = false
			this.shoppingListID = this.usrInfo.getShortUniqueID()
		}

  }

copyID() {
	window.prompt("Enter Ctrl+C or Cmd+C to copy", this.shoppingListID)
}

getShoppingItems(id: string = ""){
	this.restAPI.postRequest({list_id: id}, "getOneList").then(res => {
		console.log('res', res)
		this.shoppingItems = res
		this.initialLength = this.shoppingItems.length;
		console.log("length:",this.shoppingItems.length);
	})
}

ionViewWillLeave(){
this.events.publish('showChoices');
}

closeModal(){
	let alert = this.alertCtrl.create({
		title: 'Cancel',
		subTitle: 'Are you sure you want to quit?',
		buttons: [
			{
				text: 'Yes',
				handler: () => {
					this.viewCtrl.dismiss()
				}
			},
			{
				text: 'No',
				role: 'cancel'
			}
		]
	})
	alert.present()
}

//ADD ENTRY
addItem(){
	console.log('item', this.newItem)

	this.shoppingItems.push(this.newItem)
	this.newItem = {
		item_name: "",
		quantity: null,
		price: null,
	}
	console.log("PAODA",this.shoppingItems)

}

//DELETE ITEM
deleteItem(index: number){
	this.shoppingItems.splice(index, 1);
}

//TODO Kevin: submit this.shoppingItems to SQL database here
submitList() {
	var arr2 = []
	if (this.editMode) {
			for(var i = this.initialLength; i < this.shoppingItems.length; i++ ){
			arr2.push(this.shoppingItems[i])

		}

		console.log(arr2)
		var newObj = {
			items: arr2,
			list_id: this.shoppingListID,
			userId: this.usrInfo.getUsrId()
		}
			this.restAPI.postRequest(newObj,"addList").then(
				gucci => {
					this.usrInfo.ajaxLists(this.usrInfo.getUsrId());
				}
			)
	}
	else {
		var obj1 = {usrid: this.usrInfo.getUsrId(),
				list_id: this.shoppingListID
		}
		var obj = {
			items: this.shoppingItems,
			list_id: this.shoppingListID,
			userId: this.usrInfo.getUsrId()
		}
		this.restAPI.postRequest(obj1,"addListId").then(
				success => {
				},
				fail =>{
					console.log(fail,"dam")
						this.restAPI.postRequest(obj,"addList").then(
						gucci => {
							this.usrInfo.ajaxLists(this.usrInfo.getUsrId());
						}
					)
				}
			)
		this.restAPI.postRequest(obj,"addList").then(
		gucci => {
			this.usrInfo.ajaxLists(this.usrInfo.getUsrId());
		}
	)
	}

	this.viewCtrl.dismiss()
}


/*****************API STUFF */
	askQuestion() {
		this.restAPI.postRequest(
			{question: this.question}, "askQuestion",
		).then(response => {
			console.log('le answer', response)
			this.answer = response.answer || "Sorry, there is no answer right now."
			
		})
		.catch(err => {
			console.log('err', err)
		})
	}

	
}


