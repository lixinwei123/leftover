import { Component } from '@angular/core';

/**
 * Generated class for the ListDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-detail',
  templateUrl: 'list-detail.html'
})
export class ListDetailComponent {

  text: string;

  constructor() {
    console.log('Hello ListDetailComponent Component');
    this.text = 'Hello World';
  }

}
