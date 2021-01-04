import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{

  products=[];
  categories$;
  category;
  filteredProducts=[];

  constructor( 
    route: ActivatedRoute,
    productService: ProductService, 
    categoryService: CategoryService) { 
    productService.getAll().subscribe(
        products=>{
          this.products=products;
          this.categories$ = categoryService.getAll();

          route.queryParamMap.subscribe(params =>{
            this.category = params.get('category')
            
            this.filteredProducts= (this.category) ?
            this.products.filter(p=>p.payload.val().category === this.category) :
            this.products;
            
          });

          
        });      
  }

  ngOnInit(): void {
  }

}
