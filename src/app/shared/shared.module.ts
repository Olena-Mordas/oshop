import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';




@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, NgbModule ,// storage
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule ,// storage
  ],
  providers: [
    AuthService, 
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
