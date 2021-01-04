import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent{

  @Input('product') product;
  @Input('showActions') showActions = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
