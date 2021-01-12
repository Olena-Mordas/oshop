import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  shipping :any = {}; 
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;


  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: ShoppingCartService){}
  
  async ngOnInit(){
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart=>this.cart=cart);
    this.userSubscription = this.authService.user$
    .subscribe(user=>this.userId=user.uid);
  }

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.storeOrder(order);
  }    

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
