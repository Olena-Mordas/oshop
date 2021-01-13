import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart;
  shipping :any = {}; 
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$
    .subscribe(user=>this.userId=user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let res  =  await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', res.key]);
  }  
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
