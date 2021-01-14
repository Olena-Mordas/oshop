import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Order } from 'shared/models/order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  placeOrder(order){
    this.cartService.clearCart();
    return this.db.list('/orders').push(order);
  }

  getAllOrders(){
    return this.db.list('/orders').valueChanges();
  }

  getUserOrders(uid){
    return this.db.list('/orders',ref => ref.orderByChild('userId').equalTo(uid)).valueChanges();
  }
}
