import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{

  appUser: AppUser;
  cart$: Observable<ShoppingCart>

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {  }  

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=> this.appUser=appUser);
    this.cart$ = await this.cartService.getCart();
    
  }
   
  logout(){
    this.auth.logout();
  }

}
