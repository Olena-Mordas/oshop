import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Product} from '../models/product';

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
          for (let p of products){
            let productValue = p.payload.val() as Product;
            this.products.push(new Product({...productValue, key:p.key}))
          }
        
          return route.queryParamMap;  
        }))
        .subscribe(params =>{
          this.category = params.get('category')
          
          this.filteredProducts= (this.category) ?
          this.products.filter(p=>p.payload.val().category === this.category) :
          this.products;

        })      
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart=>this.cart=cart);
    
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }
}
