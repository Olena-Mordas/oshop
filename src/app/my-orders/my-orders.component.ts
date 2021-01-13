import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orders$;
  uid;

  constructor(
    private orderService: OrderService,
    private authService: AuthService) { }

  async ngOnInit() {
    this.orders$ = this.authService.user$
    .pipe(switchMap(user=>this.orderService.getUserOrders(user.uid)));
  }

}
