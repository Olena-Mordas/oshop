import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  cart: ShoppingCart = new ShoppingCart();
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;


  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: ShoppingCartService){}
  
  async ngOnInit(){
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart=>this.cart=cart);
    this.userSubscription = this.authService.user$
    .subscribe(user=>this.userId=user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let res  =  await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', res.key]);
  }    

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
