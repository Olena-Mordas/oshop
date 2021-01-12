import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { Product} from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { SnapshotAction } from '@angular/fire/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products=[];
  category;
  filteredProducts=[];
  cart$: Observable<ShoppingCart>;

  constructor( 
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { 

    
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts(); 
  }

  private populateProducts(){
    this.productService.getAll().pipe(
      switchMap(
        products => {
          this.initProducts(products);
          return this.route.queryParamMap;
        }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
  }

  private initProducts(products){
    for (let p of products) {
      let productValue = p.payload.val() as Product;
      this.products.push(new Product({ ...productValue, key: p.key }))
    }
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.payload.val().category === this.category) :
    this.products;
  }
}
