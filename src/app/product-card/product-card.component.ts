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
  @Input('shoppingCart') shoppingCart;
  
  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;

    let item=this.shoppingCart.items[this.product.key];
    return item? item.quantity : 0;
  }
}
