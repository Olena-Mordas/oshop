import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from './shopping/components/product-filter/product-filter.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
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
    NavBarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    AdminModule,
    ShoppingModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, NgbModule ,// storage
    CustomFormsModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
