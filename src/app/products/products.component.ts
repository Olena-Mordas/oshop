import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  products=[];
  category;
  filteredProducts=[];
  cartSubscription:Subscription;
  cart;

  constructor( 
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) { 

    productService.getAll().pipe(
      switchMap(
        products=>{
          this.products=products;
          
          return route.queryParamMap;  
        }))
        .subscribe(params =>{
          this.category = params.get('category')
          
          this.filteredProducts= (this.category) ?
          this.products.filter(p=>p.payload.val().category === this.category) :
          this.products;

        })      
  }

  ngOnInit() {
    this.shoppingCartService.getCart().then(res=>{
      this.cartSubscription = res.subscribe(cart=>this.cart=cart.payload.val())
    });
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }
}
