import { Component, OnInit } from '@angular/core';
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
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {  }  

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=> this.appUser=appUser);
    let cart$ = await this.cartService.getCart();
    cart$.subscribe(cart=>{
      this.shoppingCartItemCount=0;
      for (let productId in cart.payload.val()['items'] )
        this.shoppingCartItemCount+=cart.payload.val()['items'][productId].quantity;
    })
  }
   
  logout(){
    this.auth.logout();
  }

}
