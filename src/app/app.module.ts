import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';

const firebaseConfig = {
  apiKey: "AIzaSyC4Eco99lL-bIWwGAr75Y7_hqBdCj7SLEI",
  authDomain: "oshop-6448c.firebaseapp.com",
  databaseURL: "https://oshop-6448c.firebaseio.com",
  projectId: "oshop-6448c",
  storageBucket: "oshop-6448c.appspot.com",
  messagingSenderId: "358022914261",
  appId: "1:358022914261:web:4e07b7c9c01b9ccd79c25c",
  measurementId: "G-0WNVXVYL50"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    CoreModule, 
    AdminModule,
    ShoppingModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
