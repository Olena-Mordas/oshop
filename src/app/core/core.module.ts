import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavBarComponent
  ]

})
export class CoreModule { }
