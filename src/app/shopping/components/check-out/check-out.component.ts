import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{
  
  cart$: Observable<ShoppingCart> ;

  constructor(private cartService: ShoppingCartService){}
  
  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();
  }

}
