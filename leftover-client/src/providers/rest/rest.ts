import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = "http://localhost:3000";
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }


 postRequest(uObj: object, method: string): Promise<any> {
  return new Promise((resolve, reject) => {
     this.http.post(this.apiUrl+ method, uObj,)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

getRequest(uObj,method){}
}
