import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserinfoProvider } from '../providers/userinfo/userinfo';

import { HttpClientModule } from "@angular/common/http"; 
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {FIREBASE_CONFIG} from './app.firebase.config';

import {ListsComponent} from '../components/lists/lists';
import {RegisterComponent} from '../components/register/register';
import { RestProvider } from '../providers/rest/rest';
import {ShopListComponent} from '../components/shop-list/shop-list';
import {MenuComponent} from '../components/menu/menu';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // LoginPage,
    RegisterComponent,
    MenuComponent,
    ShopListComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // LoginPage,
    RegisterComponent,
    ShopListComponent,
    ListsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserinfoProvider,
    RestProvider
  ]
})
export class AppModule {}
