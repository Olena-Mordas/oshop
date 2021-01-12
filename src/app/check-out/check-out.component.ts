import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  shipping = {}; 
  cart: ShoppingCart;
  cartSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private cartService: ShoppingCartService){}
  
  async ngOnInit(){
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart=>this.cart=cart)
  }

  placeOrder() {
    let order = {
      dataPlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i=>{
        return {
          product:{
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
    this.orderService.storeOrder(order);
  }    

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }
}
