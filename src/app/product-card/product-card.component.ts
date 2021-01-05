import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent{

  @Input('product') product;
  @Input('showActions') showActions = true;
  
  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }
}
