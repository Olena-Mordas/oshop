import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

const routes: Routes = [
  {
    path: 'admin/products/new', 
    component: ProductFormComponent, 
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:id', 
    component: ProductFormComponent, 
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AuthGuard, AdminAuthGuard]
  },
];


@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    AdminAuthGuard
  ]
})
export class AdminModule { }
