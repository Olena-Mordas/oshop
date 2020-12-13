import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product={};
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    let id  = this.route.snapshot.paramMap.get('id');
    if(id) this.productService.get(id).pipe(take(1)).subscribe(res=>this.product = res);
  }

  save(product){
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
