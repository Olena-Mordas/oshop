import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products:Product[]=[];
  filteredProducts;
  subscription: Subscription;

  constructor(private productService: ProductService) {} 

  ngOnInit(): void {
    this.subscription = this.productService.getAll()
    .subscribe(products=>this.initProducts(products));
  }

  private initProducts(products){
    for (let p of products) {
      let productValue = p.payload.val() as Product;
      this.products.push(new Product({ ...productValue, key: p.key }))
    }
    this.filteredProducts=this.products;
  }

  filter(query:string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
