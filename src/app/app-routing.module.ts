import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
