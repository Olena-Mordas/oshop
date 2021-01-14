import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products;
  filteredProducts;
  subscription: Subscription;

  constructor(private productService: ProductService) {} 

  ngOnInit(): void {
    this.subscription = this.productService.getAll()
    .subscribe(resp=>this.filteredProducts = this.products=resp);
  }

  filter(query:string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
