import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders$;

  constructor(
    private orderService: OrderService,
    private userService: UserService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getAll();
  }

}
